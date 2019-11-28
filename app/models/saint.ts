import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

import Pew from './pew';
import Plate from './plate';

export interface INeighbor {
	receivePlate(plate: Plate) : boolean
}
/**
* Model of a saint.
* 
* @class SaintModel
* @extends Ember.Object
*/
export default class Saint {
	/**
	* The pew in which the saint currently resides.
	*/
	@tracked pew : Pew;
	/**
	* The seat in the pew where the saint currently resides. Between 0 and pew.seats-1, inclusive.
	*/
	@tracked seat : number;
	/**
	* The horizontal position of the saint within the diagram.
	* @property x
	*/
	@tracked x : number = 0;
	/**
	* The vertical position of the saint within the diagram.
	* @property y
	*/
	@tracked y : number = 0;
	/**
	* Whether the saint has had access to the plate 
	*/
	fed : boolean = false;
	/**
	* Initialize the model with defaults for any information not supplied
	* @private
	*/
	constructor(pew : Pew, seat : number) {
		assert("Saint must be created with a pew", pew !== undefined);
		assert("Saint must be created with a seat", seat !== undefined);
		this.pew = pew;
		this.seat = seat;
		this.pew.addSaint(this);
		this.move(this.pew, this.seat);
	}
	/**
	* <i>Behavior:</i> Move to the specified pew and seat
	* @param {Pew} pew - The pew to which to move
	* @param {number} seat - The seat to which to move
	*/
	move (this:Saint, pew : Pew, seat:number) {
		var realseat;
		if (seat > this.pew.seats) {
			realseat = this.pew.seats;
		} else if (seat < -1) {
			realseat = -1;
		} else {
			realseat = seat;
		}
		if (this.pew !== null) {
			this.pew.removeSaint(this);
		}
		this.pew = pew;
		this.seat = realseat;
		var coords = pew.getSaintPosition(realseat);
		this.x = coords.x;
		this.y = coords.y;
		this.pew.addSaint(this);
	}
	/**
	* <i>Behavior:</i> Pass the plate to a neighbor, whether a saint or a deacon
	* @param {Plate} plate - The plate that the saint is passing
	* @param {Saint|DeaconModel} neighbor - The neighbor being offered the plate
	*/
	passPlate(this:Saint, plate : Plate, neighbor : INeighbor){
		if (neighbor) {
			if (!neighbor.receivePlate(plate)) {
				plate.direction = 0;
			}
		} else {
			// if we aren't falling off the end of a row, reverse direction
			if (! ((this.seat === 0 && plate.direction === -1) || 
					(this.seat === this.pew.seats && plate.direction === 1))) { 
				plate.direction = - plate.direction;
			}
		}
	}
	/**
	* <i>Opportunity:</i> The saint has a plate in hand this iteration and has the opportunity to act
	* @param {Plate} plate - The plate that the saint can act upon
	*/
	plateInHands(plate: Plate) {
		var neighbor;
		if (this.seat === 0 && plate.direction < 0) {
			neighbor = this.pew.findDeacon(-1);
		} else if (this.seat === this.pew.seats-1 && plate.direction > 0) {
			neighbor = this.pew.findDeacon(this.pew.seats);
		} else {
			neighbor = this.pew.findSaint(this.seat + plate.direction);
			if (!neighbor) {
				plate.direction = -plate.direction;
				neighbor = this.pew.findSaint(this.seat + plate.direction);
			}
		}
		if (neighbor) {
			this.passPlate(plate, neighbor);
		}
	}
	/**
	* <i>Opportunity:</i> The saint has been offered a plate and has the opportunity to act
	* @param {Plate} plate - The plate that the saint can act upon
	*/
	receivePlate(plate: Plate) : boolean {
		var oldSeat = plate.seat;
		plate.move(this.pew, this.seat);
		if (oldSeat < this.seat) {
			plate.direction = 1;
		} else if (oldSeat > this.seat) {
			plate.direction = -1;
		}
		this.fed = true;
		return true;
	}
}
