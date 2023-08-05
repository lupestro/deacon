import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

import Pew from './pew';
import Plate from './plate';
import { INeighbor } from './saint';

/**
 * Model of a deacon.
 */
export default class Deacon {
  /**
   * The pew by which the deacon currently resides.
   */
  @tracked pew: Pew;
  /**
   * The seat in the pew where the deacon currently resides. Typically -1 or pew.seats.
   */
  @tracked seat: number;
  /**
   * The {{#crossLink "PlateModel"}}plates{{/crossLink}} that the deacon is currently holding
   */
  @tracked plates: Plate[];
  /**
   * The horizontal position of the deacon within the diagram.
   */
  @tracked x: number = 0;
  /**
   * The vertical position of the deacon within the diagram.
   */
  @tracked y: number = 0;
  /**
   * For each plate, whether this deacon received it on this row. Internal bookkeeping
   */
  _passed: boolean[] = [];
  /**
   * Initialize the model with defaults for any information not supplied
   */
  constructor(pew: Pew, seat: number, plates: Plate[]) {
    assert('Deacon must be constructed with pew assigned', pew !== undefined);
    assert('Deacon must be constructed with seat assigned', seat !== undefined);
    assert(
      'Deacon must be constructed with plates assigned',
      plates !== undefined
    );
    this.pew = pew;
    this.plates = plates;
    if (seat > this.pew.seats) {
      this.seat = this.pew.seats;
    } else if (seat < -1) {
      this.seat = -1;
    } else {
      this.seat = seat;
    }

    this._passed = [];
    for (let p = 0, pLen = this.plates.length; p < pLen; p++) {
      this._passed.push(false);
    }
    this.move(this.pew); /* sets x & y */
  }
  /**
   * Reset state to supplied state
   * @param {Array of PlateModel} plates - The {{#crossLink "PlateModel"}}plates{{/crossLink}} to hold
   * @param {Pew} pew - The pew to stand next to
   */
  reset(plates: Plate[], pew: Pew) {
    this.plates = plates;
    this._passed = [];
    for (let p = 0, pLen = this.plates.length; p < pLen; p++) {
      this._passed.push(false);
    }
    this.move(pew);
  }
  /**
   * <i>Behavior:</i> Move to a specfic pew
   * @param {Pew} pew - The pew to which to move
   */
  move(pew: Pew) {
    if (this.pew !== null) {
      this.pew.removeDeacon(this);
    }
    this.pew = pew;
    this.seat = pew.getDeaconSeat(this);
    const coords = pew.getDeaconPosition(this.seat);
    this.x = coords.x;
    this.y = coords.y;
    this.pew.addDeacon(this);
    for (const [index, plate] of this.plates.entries()) {
      plate.move(pew, this.seat);
      if (this._passed[index]) this._passed[index] = false;
    }
  }
  /**
   * <i>Behavior:</i> Pass the plate to a neighbor, presumably a saint
   * @param {Plate} plate - The plate to pass
   * @param {Saint|Deacon} neighbor - The neighbor to which to pass the plate
   */
  passPlate(plate: Plate, neighbor: INeighbor) {
    let idx = -1;
    for (let p = 0, pLen = this.plates.length; p < pLen; p++) {
      if (plate === this.plates[p]) {
        idx = p;
        break;
      }
    }
    if (idx >= 0 && !this._passed[idx]) {
      if (neighbor) {
        if (this.seat < 0) {
          plate.direction = 1;
        } else {
          plate.direction = -1;
        }
        if (neighbor.receivePlate(plate)) {
          const index = this.plates.indexOf(plate);
          if (index >= 0) {
            this.plates.splice(index, index + 1);
            this._passed.splice(index, index + 1);
          }
        }
      }
    }
  }
  /**
   * <i>Opportunity:</i> A plate has reached the end of a pew - Do you go retrieve it?
   * @param {Plate} plate - The plate that's arriving
   */
  plateArriving(plate: Plate) {
    if (plate.pew !== this.pew) {
      this.move(plate.pew);
    }
  }
  /**
   * <i>Opportunity:</i> A plate is in your hands - What are you going to do about it?
\	 * @param {Plate} plate - The plate in question
   * @param {Array of PewModel} pews = The full set of {{#crossLink "PewModel"}}pews{{/crossLink}}
   * in which you might do something with the plate.
   */
  plateInHands(plate: Plate, pews: Pew[]) {
    // If everyone in the row is fed, move on, unless you're stacked up with plates
    if (plate.pew.allAreFed() && this.plates.length <= 1) {
      // Time to move on to another pew
      let p = pews.indexOf(plate.pew);
      while (--p >= 0) {
        const pew = pews[p];
        if (pew && !pew.allAreFed()) {
          this.move(pew);
          break;
        }
      }
    } else if (
      !plate.pew.hasPlateInMotion() &&
      this.plates.indexOf(plate) >= 0
    ) {
      let somethingPassed = false;
      for (let m = 0, mLen = this.plates.length; m < mLen; m++) {
        if (this._passed[m]) {
          somethingPassed = true;
        }
      }
      // If you didn't just get a plate from this row, send this plate down the row.
      // If you just got the plate but you've got multiple plates,
      // send it back down the row of fed saints to the other deacon.
      // Otherwise, there's no plate to send to folks only the ohter deacon can reach.
      if (!somethingPassed || this.plates.length > 1) {
        if (this.seat < 0) {
          plate.direction = 1;
        } else {
          plate.direction = -1;
        }
        const saint = plate.pew.findSaint(plate.seat + plate.direction);
        if (saint) {
          this.passPlate(plate, saint);
        } else {
          plate.direction = 0;
        }
      }
    }
  }
  /**
   * <i>Opportunity:</i> A plate is being passed to you - Do you accept it?
   * @param {Plate} plate - The plate you're being offered
   */
  receivePlate(plate: Plate) {
    plate.move(this.pew, this.seat);
    plate.direction = 0;
    this.plates.push(plate);
    this._passed.push(true);
    return true;
  }
}
