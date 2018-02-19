import EmberObject from '@ember/object';
import Pew from 'deacon/models/pew';
import DeaconModel from 'deacon/models/deacon';
import Plate from 'deacon/models/plate';
/**
* @module Deacon.Models
*/

export interface INeighbor {
	receivePlate(plate: Plate) : boolean
}
interface ILocation {
	pew : Pew
	seat: number
}
/**
* Model of a saint.
* 
* @class SaintModel
* @extends Ember.Object
*/
export default class Saint extends EmberObject {
	/**
	* The horizontal position of the saint within the diagram.
	* @property x
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	x : number ;
	/**
	* The vertical position of the saint within the diagram.
	* @property y
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	y : number ;
	/**
	* The pew in which the saint currently resides.
	* @property pew
	* @type PewModel
	*/
	pew : Pew;
	/**
	* The seat in the pew where the saint currently resides. Between 0 and pew.seats-1, inclusive.
	* @property seat
	* @type number
	*/
	seat : number;
	/**
	* Whether the saint has had access to the plate 
	* @property fed
	* @type boolean
	*/
	fed : boolean = false;
	/**
	* Initialize the model with defaults for any information not supplied
	* @method init
	* @private
	* @return whatever its parent returns
	*/
	constructor(location: ILocation) {
		super();
		this.pew = location.pew;
		this.pew.addSaint(this);
		this.move(location.pew, location.seat);
	}
	/**
	* <i>Behavior:</i> Move to the specified pew and seat
	* @method move
	* @param {Pew} pew - The pew to which to move
	* @param {number} seat - The seat to which to move
	*/
	move (this:Saint, pew : Pew, seat:number) {
		var realseat;
		if (seat > this.pew.get('seats')) {
			realseat = this.pew.get('seats');
		} else if (seat < -1) {
			realseat = -1;
		} else {
			realseat = seat;
		}
		if (this.pew !== null) {
			this.pew.removeSaint(this);
		}
		this.set('pew', pew);
		this.set('seat', realseat);
		var coords = pew.getSaintPosition(realseat);
		this.set('x', coords.x);
		this.set('y', coords.y);
		this.pew.addSaint(this);
	}
	/**
	* <i>Behavior:</i> Pass the plate to a neighbor, whether a saint or a deacon
	* @method passPlate
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
	* @method plateInHands
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
	* @method receivePlate
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
