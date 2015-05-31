import Ember from 'ember';
/**
* @module Deacon.Models
*/

/**
* Model of a saint.
* 
* @class SaintModel
* @extends Ember.Object
*/
export default Ember.Object.extend({
	/**
	* The horizontal position of the saint within the diagram.
	* @property x
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	x: null,
	/**
	* The vertical position of the saint within the diagram.
	* @property y
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	y: null,
	/**
	* The pew in which the saint currently resides.
	* @property pew
	* @type PewModel
	*/
	pew: null,
	/**
	* The seat in the pew where the saint currently resides. Between 0 and pew.seats-1, inclusive.
	* @property seat
	* @type number
	*/
	seat: null,
	/**
	* Whether the saint has had access to the plate 
	* @property fed
	* @type boolean
	*/
	fed: null,
	/**
	* Initialize the model with defaults for any information not supplied
	* @method init
	* @private
	* @return whatever its parent returns
	*/
	init: function() {
		if (this.x === null) {
			this.x = 0;
		}
		if (this.y === null) {
			this.y = 0;
		}
		if (this.fed === null) {
			this.fed = false;
		}
		if (this.seat !== null && this.pew !== null) {
			if (this.seat > this.pew.get('seats')) {
				this.seat = this.pew.get('seats');
			} else if (this.seat < -1) {
				this.seat = -1;
			}
		}
		if (this.pew !== null) {
			this.pew.addSaint(this);
		}

		return this._super();
	},
	/**
	* <i>Behavior:</i> Move to the specified pew and seat
	* @method move
	* @param {PewModel} pew - The pew to which to move
	* @param {number} seat - The seat to which to move
	*/
	move: function(pew, seat) {
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
	},
	/**
	* <i>Behavior:</i> Pass the plate to a neighbor, whether a saint or a deacon
	* @method passPlate
	* @param {PlateModel} plate - The plate that the saint is passing
	* @param {SaintModel|DeaconModel} neighbor - The neighbor being offered the plate
	*/
	passPlate: function(plate, neighbor){
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
	},
	/**
	* <i>Opportunity:</i> The saint has a plate in hand this iteration and has the opportunity to act
	* @method plateInHands
	* @param {PlateModel} plate - The plate that the saint can act upon
	*/
	plateInHands: function (plate) {
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
	},
	/**
	* <i>Opportunity:</i> The saint has been offered a plate and has the opportunity to act
	* @method receivePlate
	* @param {PlateModel} plate - The plate that the saint can act upon
	*/
	receivePlate: function(plate) {
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
});
