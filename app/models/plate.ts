import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

import Pew from './pew';

/**
 * Model of a plate.
 */
export default class Plate {
  /**
   * The pew in which the plate currently resides.
   */
  @tracked pew: Pew;
  /**
   * The seat in the pew which the plate currently resides:
   * * A seat of -1 is to the left of the pew (hint: where a deacon might be standing).
   * * A seat of pew.seats is to the right of the pew (hint: where a deacon might be standing).
   * * A seat between these values is within the pew (hint: where a saint might be sitting).
   */
  @tracked seat: number;
  /**
   * The horizontal position of the plate within the diagram.
   */
  @tracked x: number = 0;
  /**
   * The vertical position of the plate within the diagram.
   */
  @tracked y: number = 0;
  /**
   * The direction in which the plate is moving:
   * * -1 : To the left.
   * * +1 : To the right.
   * * 0 : Not moving.
   */
  direction: number = 0;
  /**
   * Initialize the model with defaults for any information not supplied
   */
  constructor(pew: Pew, seat: number) {
    assert('The pew must be supplied when creating a plate', pew !== undefined);
    assert(
      'The seat must be supplied when creating a plate',
      seat !== undefined
    );
    this.pew = pew;
    this.seat = Math.max(Math.min(seat, this.pew.seats), -1);
    this.move(this.pew, this.seat);
  }
  /**
   * Reset the behavior of the plate - set it to no longer be moving
   */
  reset(this: Plate) {
    this.direction = 0;
  }
  /**
   * Initialize the model with defaults for any information not supplied
   * @param {Pew} pew - the pew to move it to
   * @param {number} seat - the seat to move it to
   */
  move(this: Plate, pew: Pew, seat: number) {
    const movingPews = this.pew !== pew;
    if (movingPews && this.pew) {
      this.pew.removePlate(this);
    }
    const coord = pew.getPlatePosition(seat);
    this.x = coord.x;
    this.y = coord.y;
    this.pew = pew;
    this.seat = seat;
    if (movingPews && this.pew) {
      this.pew.addPlate(this);
    }
  }
}
