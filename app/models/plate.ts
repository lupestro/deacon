import EmberObject from '@ember/object';
import { assert } from '@ember/debug';

import Pew from './pew';

/**
* Model of a plate.
*/
export default class Plate extends EmberObject {
	/**
	* The pew in which the plate currently resides.
	*/
	pew! : Pew; 
	/**
	* The seat in the pew which the plate currently resides: 
	* * A seat of -1 is to the left of the pew (hint: where a deacon might be standing).
	* * A seat of pew.seats is to the right of the pew (hint: where a deacon might be standing).
	* * A seat between these values is within the pew (hint: where a saint might be sitting).
	*/
	seat! : number;
	/**
	* The horizontal position of the plate within the diagram.
	*/
	x : number;
	/**
	* The vertical position of the plate within the diagram.
	*/
	y : number;
	/**
	* The direction in which the plate is moving: 
	* * -1 : To the left.
	* * +1 : To the right.
	* * 0 : Not moving.
	*/
	direction : number;
	/**
	* Initialize the model with defaults for any information not supplied
	*/
	constructor() {
		super(...arguments);
		assert("The pew must always be supplied when creating a plate.", this.pew !== undefined);
		assert("The seat must always be supplied when creating a plate", this.seat !== undefined);
		this.seat = Math.min(this.seat, this.pew.get('seats'));
		this.seat = Math.max(this.seat, -1);
		this.x = 0;
		this.y = 0;
		this.direction = 0;
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
	move(this: Plate, pew : Pew, seat : number) {
		var movingPews = (this.pew !== pew);
		if (movingPews && this.pew) {
			this.pew.removePlate(this);
		}
		var coord = pew.getPlatePosition(seat);
		this.set('x',coord.x);
		this.set('y',coord.y);
		this.set('pew', pew);
		this.set('seat', seat);
		if (movingPews && this.pew) {			
			this.pew.addPlate(this);
		}
	}
}