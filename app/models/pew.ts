import Saint from './saint';
import Deacon from './deacon';
import Plate from './plate';
/**
 * @module Deacon.Models
 */

interface IPewPosition {
  x: number;
  y: number;
  seat: number;
}
interface IPosition {
  x: number;
  y: number;
}
/**
 * Model of a pew. While the pew has no actual behavior, the pew drives and tracks the visible geometry of the elements in the
 * animation. In consequence, it knows all of the deacons, saints, and plates associated with it. The pews keep the context
 * used by deacons and saints to guide their behavior throughout the animation.
 */
export default class Pew {
  /**
   * The horizontal position of the pew within the diagram.
   */
  x: number;
  /**
   * The vertical position of the pew within the diagram.
   */
  y: number;
  /**
   * The horizontal space taken by the pew.
   */
  width: number;
  /**
   * The number of seats in the pew.
   */
  seats: number;
  /**
   * The vertical space taken by the pew.
   */
  height: number = 32;
  /**
   * The {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the pew.
   */
  saints: Saint[] = [];
  /**
   * The {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to associate with the pew.
   */
  deacons: Deacon[] = [];
  /**
   * The {{#crossLink "PlateModel"}}plates{{/crossLink}} to associate with the pew.
   */
  plates: Plate[] = [];
  /**
   * Initialize the model with defaults for any information not supplied
   */
  constructor(pewConfig: {
    x: number;
    y: number;
    seats?: number;
    width?: number;
  }) {
    this.x = pewConfig.x;
    this.y = pewConfig.y;
    this.seats = pewConfig.seats
      ? pewConfig.seats
      : pewConfig.width
      ? (pewConfig.width - 20) / 32
      : 6;
    this.width = pewConfig.width ? pewConfig.width : 20 + this.seats * 30;
  }

  /**
   * Get the x,y position to apply to a saint at a specified seat in the pew.
   * Result is supplied as a hash with x and y keys.
   * @param {number} seat - The seat at which the saint will be placed
   */
  getSaintPosition(seat: number): IPewPosition {
    let realSeat = seat;
    if (seat > this.seats) {
      realSeat = this.seats - 1;
    } else if (seat < 0) {
      realSeat = 0;
    }
    const offset = 10 + realSeat * 30;
    return { x: this.x + offset, y: this.y, seat: realSeat };
  }
  /**
   * Get the x.y position to apply to a deacon at a specified seat in the pew.
   * Result is supplied as a hash with x and y keys.
   * @param {number} seat - The seat at which the deacon will be placed
   */
  getDeaconPosition(seat: number): IPosition {
    const result = { x: 0, y: this.y };
    if (seat < 0) {
      result.x = this.x - 30;
    } else if (seat >= this.seats) {
      result.x = this.x + this.width - 10;
    } else {
      result.x = this.x + 10 + seat * 30;
    }
    return result;
  }
  /**
   * Get the x.y position to apply to a plate at a specified seat in the pew.
   * Result is supplied as a hash with x and y keys.
   * @param {number} seat - The seat at which the plate will be placed
   */
  getPlatePosition(seat: number): IPosition {
    const result = { x: 0, y: this.y + 5 };
    if (seat < 0) {
      result.x = this.x - 10;
    } else if (seat >= this.seats) {
      result.x = this.x + this.width - 10;
    } else {
      result.x = this.x + 15 + seat * 30;
    }
    return result;
  }
  /**
   * Get the seat position for a deacon on the end of the row, given where the deacon was before. Adjusts for rows of different widths.
   * @param {Deacon} deacon - The deacon in question
   */
  getDeaconSeat(deacon: Deacon): number {
    if (deacon.seat < 0) {
      return deacon.seat;
    } else {
      return this.seats;
    }
  }
  /**
   * Test whether all saints in this pew are fed.
   */
  allAreFed(): boolean {
    const unfed = this.saints.filter(function (elem) {
      return elem.fed === false;
    });
    return unfed.length === 0;
  }
  /**
   * Test whether there is a plate in motion in this pew.
   */
  hasPlateInMotion(): boolean {
    for (const plate of this.plates) {
      if (
        plate.direction !== 0 &&
        (plate.seat >= 0 || plate.seat < this.seats)
      ) {
        return true;
      }
    }
    return false;
  }
  /**
   * Add a saint to this row.
   * @param {Saint} saint - The saint to add
   */
  addSaint(saint: Saint) {
    if (-1 === this.saints.indexOf(saint)) {
      this.saints.push(saint);
    }
  }
  /**
   * Remove a saint from this row if present.
   * @param {Saint} saint - The saint to remove
   */
  removeSaint(saint: Saint) {
    const index = this.saints.indexOf(saint);
    if (index >= 0) {
      this.saints.splice(index, index + 1);
    }
  }
  /**
   * Find a saint in the specified seat of this row if present or null if not.
   * @param {number} - The seat to look in
   */
  findSaint(seat: number): Saint | null {
    const saint = this.saints.filter((elem) => {
      return elem.seat === seat;
    });
    if (saint.length === 0 || !saint[0]) {
      return null;
    } else {
      return saint[0];
    }
  }
  /**
   * Add a deacon to this row.
   * @param {Deacon} deacon - The deacon to add
   */
  addDeacon(deacon: Deacon) {
    if (-1 === this.deacons.indexOf(deacon)) {
      this.deacons.push(deacon);
    }
  }
  /**
   * Remove a deacon from this row if present.
   * @param {Deacon} deacon - The deacon to remove
   */
  removeDeacon(deacon: Deacon) {
    const index = this.deacons.indexOf(deacon);
    if (index >= 0) {
      this.deacons.splice(index, index + 1);
    }
  }
  /**
   * Find a deacon in the specified seat of this row if present or null if not.
   * @param {number} seat - The seat to look in
   */
  findDeacon(seat: number): Deacon | null {
    const deacon = this.deacons.filter((elem) => {
      return elem.seat === seat;
    });
    if (deacon.length === 0 || !deacon[0]) {
      return null;
    } else {
      return deacon[0];
    }
  }
  /**
   * Add a plate to this row.
   * @param {Plate} plate - The plate to add
   */
  addPlate(plate: Plate) {
    if (-1 === this.plates.indexOf(plate)) {
      this.plates.push(plate);
    }
  }
  /**
   * Remove a plate from this row if present.
   * @param {Plate} plate - The plate to remove
   */
  removePlate(plate: Plate) {
    const index = this.plates.indexOf(plate);
    if (index >= 0) {
      this.plates.splice(index, index + 1);
    }
  }
}
