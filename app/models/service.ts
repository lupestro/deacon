import { tracked } from '@glimmer/tracking';
import Deacon from './deacon';
import Plate from './plate';
import Layout from './layout';
import { assert } from '@ember/debug';

type ShorthandLayoutPattern = (number | string)[][];
const OFF_LEFT_SEAT = -1;
const OFF_RIGHT_SEAT = 1000000;

/**
 * Master model for the service controller and route.
 */
export default class ServiceModel {
  /**
   * Name of current stage of service
   */
  @tracked stageName: string;
  /**
   * Height on screen of the entire service
   */
  height: number;
  /**
   * Width on screen of the entire service
   */
  width: number;
  /**
   * The pattern of pews and the arrangement of saints in those pews.
   */
  pattern: ShorthandLayoutPattern;
  /**
   * Model of internal layout of the service, including all pews and saints
   * @private
   */
  layout: Layout;
  /**
   * Models of the {{#crossLink "DeaconModel"}}deacons{{/crossLink}} defined
   */
  deacons: Deacon[];
  /**
   * Models of the {{#crossLink "PlateModel"}}plates{{/crossLink}} defined
   */
  plates: Plate[];
  /**
   * Initialize the model with defaults for any information not supplied
   */
  constructor(pattern: ShorthandLayoutPattern) {
    this.stageName = 'Offertory';
    this.pattern = pattern || [
      [5, '*'],
      [5, '*'],
    ];
    this.layout = new Layout(this.pattern);
    const pews = this.layout.pews;
    this.height = 40 + pews.length * 40;
    this.width =
      60 +
      pews.reduce((prev, pew) => {
        return Math.max(prev, pew.width);
      }, 0);

    const pew0 = pews[pews.length - 1];
    const pew1 = pews[pews.length - 2];

    assert('Last two pews exist', pew0 && pew1);

    const plate0 = new Plate(pew0, OFF_LEFT_SEAT),
      plate1 = new Plate(pew1, OFF_RIGHT_SEAT);
    this.plates = [plate0, plate1];

    this.deacons = [
      new Deacon(pew0, OFF_LEFT_SEAT, [plate0]),
      new Deacon(pew1, OFF_RIGHT_SEAT, [plate1]),
    ];
  }
  /**
   * Get the number of seats in the pew with the specified index
   * @deprecated Use the pew directly to get its seats
   * @param {number} index of the pew
   * @return {number} the number of seats in the pew
   */
  getPewSeats(pewIndex: number): number {
    const pews = this.layout.pews;
    if (pewIndex < 0 || pewIndex >= pews.length) {
      return 0;
    } else {
      const pew = pews[pewIndex];
      if (!pew) {
        return 0;
      } else {
        return pew.seats;
      }
    }
  }
  /**
   * Reset the position and condition of the deacons and the plates
   */
  resetPlatesAndDeacons() {
    const pews = this.layout.pews;
    const lastPew = pews[pews.length - 1];
    const nextLastPew = pews[pews.length - 2];
    const firstPlate = this.plates[0];
    const otherPlate = this.plates[1];
    const firstDeacon = this.deacons[0];
    const otherDeacon = this.deacons[1];
    assert('Two deacons exist', firstDeacon && otherDeacon);
    assert('Each deacon has a plate', firstPlate && otherPlate);
    assert('At least two pews exist', lastPew && nextLastPew);
    firstPlate.reset();
    otherPlate.reset();
    firstDeacon.reset([firstPlate], lastPew);
    otherDeacon.reset([otherPlate], nextLastPew);
  }
}
