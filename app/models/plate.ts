import EmberObject from '@ember/object';
import Pew from 'deacon/models/pew';
/**
* @module Deacon.Models
*/

interface ILocation
{
	pew  : Pew,
	seat: number
}
/**
* Model of a plate.
* 
* @class PlateModel
* @extends Ember.Object
*/
export default class Plate extends EmberObject {
	/**
	* The horizontal position of the plate within the diagram.
	* @property x
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	x : number;
	/**
	* The vertical position of the plate within the diagram.
	* @property y
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	y : number;
	/**
	* The pew in which the plate currently resides.
	* @property pew
	* @type PewModel
	*/
	pew : Pew; 
	/**
	* The seat in the pew which the plate currently resides: 
	* * A seat of -1 is to the left of the pew (hint: where a deacon might be standing).
	* * A seat of pew.seats is to the right of the pew (hint: where a deacon might be standing).
	* * A seat between these values is within the pew (hint: where a saint might be sitting).
	* @property seat
	* @type number
	*/
	seat : number;
	/**
	* The direction in which the plate is moving: 
	* * -1 : To the left.
	* * +1 : To the right.
	* * 0 : Not moving.
	* @property direction
	* @type number
	*/
	direction : number;
	/**
	* Initialize the model with defaults for any information not supplied
	* @method constructor
	* @private
	* @return whatever its parent returns
	*/
	constructor(location: ILocation ) {
		super(...arguments);
		this.pew = location.pew;
		this.seat = location.seat;
		if (this.seat !== null && this.pew !== null) {
			this.seat = Math.min(this.seat, this.pew.get('seats'));
			this.seat = Math.max(this.seat, -1);
		}
		this.move(this.pew, this.seat);
	}
	/**
	* Reset the behavior of the plate - set it to no longer be moving
	* @method reset
	*/
	reset() {
		this.direction = 0;
	}
	/**
	* Initialize the model with defaults for any information not supplied
	* @method move
	* @param {Pew} pew - the pew to move it to
	* @param {number} seat - the seat to move it to 
	*/	
	move(pew : Pew, seat : number) {
		var thismodel: Plate = this;
		var movingPews = (this.pew !== pew);
		if (movingPews && this.pew) {
			this.pew.removePlate(this);
		}
		var coord = pew.getPlatePosition(seat);
		thismodel.set('x',coord.x);
		thismodel.set('y',coord.y);
		thismodel.set('pew', pew);
		thismodel.set('seat', seat);
		if (movingPews && this.pew) {			
			this.pew.addPlate(this);
		}
	}
}