import EmberObject from '@ember/object';
import Saint from './saint';
import Deacon from './deacon';
import Plate from './plate';
/**
* @module Deacon.Models
*/

interface IPewPosition { 
	x:number 
	y:number 
	seat:number
 }
 interface IPosition {
	 x:number
	 y:number
 }
 interface IPewDimensions {
	 x:number
	 y:number
	 width:number
	 seats:number
 }
/**
* Model of a pew. While the pew has no actual behavior, the pew drives and tracks the visible geometry of the elements in the 
* animation. In consequence, it knows all of the deacons, saints, and plates associated with it. The pews keep the context
* used by deacons and saints to guide their behavior throughout the animation. 
* 
* @class PewModel
* @extends Ember.Object
*/
export default class Pew extends EmberObject.extend({
}) {
	/**
	* The horizontal position of the pew within the diagram.
	* @property x
	* @type number
	* @default 0
	*/
	x : number;
	/**
	* The vertical position of the pew within the diagram.
	* @property y
	* @type number
	* @default 0
	*/
	y : number;
	/**
	* The horizontal space taken by the pew.
	* @property y
	* @type number
	* @default based on seats, if provided - otherwise 6 seats worth
	*/
	width : number;
	/**
	* The vertical space taken by the pew.
	* @property y
	* @type number
	* @default based on seats, if provided - otherwise 6 seats worth
	*/
	height : number;
	/**
	* The number of seats in the pew.
	* @property seats
	* @type number
	* @default based on width, if provided - otherwise 6 seats
	*/
	seats : number;
	/**
	* The {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the pew.
	* @property saints
	* @type Array of SaintModel
	* @default an empty array
	*/
	saints : Saint[];
	/**
	* The {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to associate with the pew.
	* @property deacons
	* @type Array of DeaconModel
	* @default an empty array
	*/
	deacons : Deacon[];
	/**
	* The {{#crossLink "PlateModel"}}plates{{/crossLink}} to associate with the pew.
	* @property plates
	* @type Array of PlateModel
	* @default an empty array
	*/
	plates : Plate[];
	/**
	* Initialize the model with defaults for any information not supplied
	* @method init
	* @private
	* @return whatever its parent returns
	*/
	constructor() {
		super();
		this.height = 32;
		this.saints = [];
		this.deacons = [];
		this.plates = [];
		this.seats = this.seats ? this.seats : (this.width ? (this.width - 20) / 32 : 6);
		this.width = this.width ? this.width : (20 + this.seats * 30);
	}
	/**
	* Get the x,y position to apply to a saint at a specified seat in the pew.
	* Result is supplied as a hash with x and y keys.
	* @method getSaintPosition
	* @param {number} seat - The seat at which the saint will be placed
	* @return {hash}
	*/
	getSaintPosition(this: Pew, seat : number) : IPewPosition{
		var realSeat = seat;
		if (seat > this.seats) {
			realSeat = this.seats-1;
		} else if (seat < 0) {
			realSeat = 0;
		}
		var offset = 10 + realSeat * 30;
		return {x: this.x + offset, y: this.y, seat: realSeat};
	}
	/**
	* Get the x.y position to apply to a deacon at a specified seat in the pew.
	* Result is supplied as a hash with x and y keys.
	* @method getDeaconPosition
	* @param {number} seat - The seat at which the deacon will be placed
	* @return {hash}
	*/
	getDeaconPosition(this: Pew, seat:number) : IPosition {
		var result = {x: 0, y: this.y };
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
	* @method getPlatePosition
	* @param {number} seat - The seat at which the plate will be placed
	* @return {hash} 
	*/
	getPlatePosition(this: Pew, seat:number) : IPosition {
		var result = {x: 0, y: this.y + 5};
		if (seat < 0) {
			result.x = this.x - 10;
		} else if (seat >= this.seats) {
			result.x = this.x + this.width-10;
		} else {
			result.x = this.x + 15 + seat * 30;
		}
		return result;
	}
	/**
	* Get the seat position for a deacon on the end of the row, given where the deacon was before. Adjusts for rows of different widths.
	* @method getDeaconSeat
	* @param {Deacon} deacon - The deacon in question
	* @return {number}
	*/
	getDeaconSeat(this: Pew, deacon: Deacon): number {
		if (deacon.seat < 0) {
			return deacon.seat;
		}
		else {
			return this.seats;
		}
	}
	/**
	* Test whether all saints in this pew are fed.
	* @method allAreFed
	* @return {boolean}
	*/
	allAreFed(this: Pew): boolean {
		var unfed = this.saints.filter(function (elem) {
			return (elem.fed === false);
		});
		return unfed.length === 0;
	}
	/**
	* Test whether there is a plate in motion in this pew.
	* @method hasPlateInMotion
	* @return {boolean}
	*/
	hasPlateInMotion(this: Pew): boolean {
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			if (this.plates[p].direction !== 0 && (this.plates[p].seat >= 0 || this.plates[p].seat < this.seats)) {
				return true;
			}
		}
		return false;
	}
	/**
	* Add a saint to this row.
	* @method addSaint
	* @param {Saint} saint - The saint to add
	*/
	addSaint(this: Pew, saint: Saint) {
		if (-1 === this.saints.indexOf(saint)) {
			this.saints.push(saint);
		}
	}
	/**
	* Remove a saint from this row if present.
	* @method removeSaint
	* @param {Saint} saint - The saint to remove
	*/
	removeSaint(this: Pew, saint: Saint) {
		var index = this.saints.indexOf(saint);
		if (index >= 0) {
			this.saints.splice(index,index+1);
		}
	}
	/**
	* Find a saint in the specified seat of this row if present or null if not.
	* @method findSaint
	* @param {number} - The seat to look in
	* @return {Saint} 
	*/
	findSaint(this:Pew, seat: number) : Saint | null {
		var saint = this.saints.filter(function(elem) {
			return (elem.seat === seat);
		});
		if (saint.length === 0) { 
			return null;
		} else { 
			return saint[0];
		}
	}
	/**
	* Add a deacon to this row.
	* @method addDeacon
	* @param {Deacon} deacon - The deacon to add
	*/
	addDeacon(this:Pew, deacon: Deacon) {
		if (-1 === this.deacons.indexOf(deacon)) {
			this.deacons.push(deacon);
		}
	}
	/**
	* Remove a deacon from this row if present.
	* @method removeDeacon
	* @param {Deacon} deacon - The deacon to remove
	*/
	removeDeacon(this: Pew, deacon: Deacon) {
		var index = this.deacons.indexOf(deacon);
		if (index >= 0) {
			this.deacons.splice(index,index+1);
		}		
	}
	/**
	* Find a deacon in the specified seat of this row if present or null if not.
	* @method findDeacon
	* @param {number} seat - The seat to look in
	* @return {Deacon}
	*/
	findDeacon(this: Pew, seat: number): Deacon | null {
		var deacon = this.deacons.filter(function(elem) {
			return (elem.seat === seat);
		});
		if (deacon.length === 0) { 
			return null;
		} else { 
			return deacon[0];
		}
	}
	/**
	* Add a plate to this row.
	* @method addPlate
	* @param {Plate} plate - The plate to add
	*/
	addPlate(this: Pew, plate: Plate) {
		if (-1 === this.plates.indexOf(plate)) {
			this.plates.push(plate);
		}		
	}
	/**
	* Remove a plate from this row if present.
	* @method removePlate
	* @param {Plate} plate - The plate to remove
	*/
	removePlate(this: Pew, plate: Plate) {
		var index = this.plates.indexOf(plate);
		if (index >= 0) {
			this.plates.splice(index,index+1);
		}		
	}
}
