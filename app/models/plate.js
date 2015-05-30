import Ember from 'ember';
/**
* @module Deacon.Models
*/

/**
* Model of a plate.
* 
* @class PlateModel
* @extends Ember.Object
*/
export default Ember.Object.extend({
	/**
	* The horizontal position of the plate within the diagram.
	* @property x
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	x: null,
	/**
	* The vertical position of the plate within the diagram.
	* @property y
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	y: null,
	/**
	* The pew in which the plate currently resides.
	* @property pew
	* @type PewModel
	*/
	pew: null,
	/**
	* The seat in the pew which the plate currently resides: 
	* * A seat of -1 is to the left of the pew (hint: where a deacon might be standing).
	* * A seat of pew.seats is to the right of the pew (hint: where a deacon might be standing).
	* * A seat between these values is within the pew (hint: where a saint might be sitting).
	* @property seat
	* @type number
	*/
	seat: null,
	/**
	* The direction in which the plate is moving: 
	* * -1 : To the left.
	* * +1 : To the right.
	* * 0 : Not moving.
	* @property direction
	* @type number
	*/
	direction: null, 
	/**
	* Initialize the model with defaults for any information not supplied
	* @function init
	* @private
	* @return whatever its parent returns
	*/
	init: function() {
		if (this.direction === null) {
			this.direction = 0;
		}
		if (this.seat !== null && this.pew !== null) {
			this.seat = Math.min(this.seat, this.pew.get('seats'));
			this.seat = Math.max(this.seat, -1);
		}
		if (this.x === null || this.y === null) {
			this.move(this.pew, this.seat);
		}
		return this._super();
	},
	/**
	* Reset the behavior of the plate - set it to no longer be moving
	* @function reset
	*/
	reset: function() {
		this.direction = 0;
	},
	/**
	* Initialize the model with defaults for any information not supplied
	* @function move
	* @param {PewModel} pew - the pew to move it to
	* @param {number} seat - the seat to move it to 
	*/	
	move: function(pew, seat) {
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
});