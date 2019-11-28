import EmberObject, { set }  from '@ember/object';

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
/**
* Model of a pew. While the pew has no actual behavior, the pew drives and tracks the visible geometry of the elements in the 
* animation. In consequence, it knows all of the deacons, saints, and plates associated with it. The pews keep the context
* used by deacons and saints to guide their behavior throughout the animation. 
*/
export default class Pew extends EmberObject {
	/**
	* The horizontal position of the pew within the diagram.
	*/
	x! : number;
	/**
	* The vertical position of the pew within the diagram.
	*/
	y! : number;
	/**
	* The horizontal space taken by the pew.
	*/
	width! : number;
	/**
	* The number of seats in the pew.
	*/
	seats! : number;
	/**
	* The vertical space taken by the pew.
	*/
	height : number = 32;
	/**
	* The {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the pew.
	*/
	saints : Saint[] = [];
	/**
	* The {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to associate with the pew.
	*/
	deacons : Deacon[] = [];
	/**
	* The {{#crossLink "PlateModel"}}plates{{/crossLink}} to associate with the pew.
	*/
	plates : Plate[] = [];
	/**
	* Initialize the model with defaults for any information not supplied
	*/
	init() {
		super.init();
		this.seats = this.seats ? this.seats : (this.width ? (this.width - 20) / 32 : 6);
		this._initializeWidth(this.seats, this.width);
	}

	_initializeWidth(this:Pew, seats : number, width? : number) {
		set(this, 'width', width ? width : (20 + seats * 30));
	}
	/**
	* Get the x,y position to apply to a saint at a specified seat in the pew.
	* Result is supplied as a hash with x and y keys.
	* @param {number} seat - The seat at which the saint will be placed
	*/
	getSaintPosition(this: Pew, seat : number) : IPewPosition {
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
	* @param {number} seat - The seat at which the deacon will be placed
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
	* @param {number} seat - The seat at which the plate will be placed
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
	* @param {Deacon} deacon - The deacon in question
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
	*/
	allAreFed(this: Pew): boolean {
		var unfed = this.saints.filter(function (elem) {
			return (elem.fed === false);
		});
		return unfed.length === 0;
	}
	/**
	* Test whether there is a plate in motion in this pew.
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
	* @param {Saint} saint - The saint to add
	*/
	addSaint(this: Pew, saint: Saint) {
		if (-1 === this.saints.indexOf(saint)) {
			this.saints.push(saint);
		}
	}
	/**
	* Remove a saint from this row if present.
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
	* @param {number} - The seat to look in
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
	* @param {Deacon} deacon - The deacon to add
	*/
	addDeacon(this:Pew, deacon: Deacon) {
		if (-1 === this.deacons.indexOf(deacon)) {
			this.deacons.push(deacon);
		}
	}
	/**
	* Remove a deacon from this row if present.
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
	* @param {number} seat - The seat to look in
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
	* @param {Plate} plate - The plate to add
	*/
	addPlate(this: Pew, plate: Plate) {
		if (-1 === this.plates.indexOf(plate)) {
			this.plates.push(plate);
		}		
	}
	/**
	* Remove a plate from this row if present.
	* @param {Plate} plate - The plate to remove
	*/
	removePlate(this: Pew, plate: Plate) {
		var index = this.plates.indexOf(plate);
		if (index >= 0) {
			this.plates.splice(index,index+1);
		}		
	}
}
