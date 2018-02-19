import EmberObject from '@ember/object';
import Pew from 'deacon/models/pew';
import Plate from 'deacon/models/plate';
import { INeighbor } from 'deacon/models/saint';
/**
* @module Deacon.Models
*/

interface IDeaconStart {
	pew: Pew,
	seat: number,
	plates: Plate[]
}
/**
* Model of a deacon.
* 
* @class DeaconModel
* @extends Ember.Object
*/
export default class Deacon extends EmberObject {
	/**
	* The pew by which the deacon currently resides.
	* @property pew
	* @type PewModel
	*/
	pew : Pew;
	/**
	* The seat in the pew where the deacon currently resides. Typically -1 or pew.seats.
	* @property seat
	* @type number
	*/
	seat : number;
	/**
	* The {{#crossLink "PlateModel"}}plates{{/crossLink}} that the deacon is currently holding 
	* @property plates
	* @type Array of PlateModel
	*/
	plates : Plate[];
	/**
	* The horizontal position of the deacon within the diagram.
	* @property x
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	x : number;
	/**
	* The vertical position of the deacon within the diagram.
	* @property y
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	y : number;
	/**
	* For each plate, whether this deacon received it on this row. Internal bookkeeping
	* @property _passed
	* @type Array of boolean
	*/
	_passed : boolean[];
	/**
	* Initialize the model with defaults for any information not supplied
	* @method init
	* @private
	* @return whatever its parent returns
	*/
	constructor() {
		super();
		this._passed = this._passed || [];	
		if (this.seat > this.pew.get('seats')) {
			this.seat = this.pew.get('seats');
		} else if (this.seat < -1) {
			this.seat = -1;
		} else {
			this.seat = this.seat;
		}

		this._passed = [];
		for (let p = 0, pLen = this.plates.length; p < pLen; p++) {
			this._passed.push(false);
		}
		this.move(this.pew); /* sets x & y */
	}
	/**
	* Reset state to supplied state
	* @method reset
	* @param {Array of PlateModel} plates - The {{#crossLink "PlateModel"}}plates{{/crossLink}} to hold
	* @param {Pew} pew - The pew to stand next to
	*/
	reset(this: Deacon, plates : Plate[], pew: Pew) {
		this.set('plates', plates);
		this._passed = [];
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			this._passed.push(false);
		}
		this.move(pew);
	}
	/**
	* <i>Behavior:</i> Move to a specfic pew
	* @method move
	* @param {Pew} pew - The pew to which to move
	*/
	move(this: Deacon, pew : Pew){
		if (this.pew !== null) {		
			this.pew.removeDeacon(this);
		}
		this.set('pew',pew);
		this.set('seat', pew.getDeaconSeat(this));
		var coords = pew.getDeaconPosition(this.seat);
		this.set('x',coords.x);
		this.set('y',coords.y);
		this.pew.addDeacon(this);
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			this.plates[p].move(pew, this.seat);
			this._passed[p] = false;
		}
	} 
	/**
	* <i>Behavior:</i> Pass the plate to a neighbor, presumably a saint
	* @method passPlate
	* @param {Plate} plate - The plate to pass
	* @param {Saint|Deacon} neighbor - The neighbor to which to pass the plate
	*/
	passPlate(this: Deacon, plate: Plate, neighbor : INeighbor){
		var idx = -1;
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			if (plate === this.plates[p]) {
				idx = p;
				break;
			}
		}
		if (idx >= 0 && !this._passed[idx]) {
			if (neighbor) {
				if (this.seat < 0) {
					plate.direction = 1;
				} else {
					plate.direction = -1;
				}
				if (neighbor.receivePlate(plate)) {
					var index = this.plates.indexOf(plate);
					if (index >= 0) {
						this.plates.splice(index,index+1);
						this._passed.splice(index,index+1);
					}
				}
			}
		}
	}
	/**
	* <i>Opportunity:</i> A plate has reached the end of a pew - Do you go retrieve it?
	* @method plateArriving
	* @param {Plate} plate - The plate that's arriving
	*/
	plateArriving(this: Deacon, plate: Plate) {
		if (plate.pew !== this.pew) {
			this.move(plate.pew);			
		}
	}
	/**
	* <i>Opportunity:</i> A plate is in your hands - What are you going to do about it?
	* @method plateInHands
	* @param {Plate} plate - The plate in question
	* @param {Array of PewModel} pews = The full set of {{#crossLink "PewModel"}}pews{{/crossLink}} 
	* in which you might do something with the plate.
	*/
	plateInHands(this: Deacon, plate: Plate, pews: Pew[]) {
		if (plate.pew.allAreFed()) { // Time to move on to another pew
			var p = pews.indexOf(plate.pew);
			while (--p >= 0) {
				if (!pews[p].allAreFed()) {
					this.move(pews[p]);
					break;
				}
			}
		} else if (!plate.pew.hasPlateInMotion() && 
                    this.plates.indexOf(plate) >= 0) {
			var somethingPassed = false;
			for (var m = 0, mLen = this.plates.length; m < mLen; m++) {
				if (this._passed[m]) {
					somethingPassed = true;
				}
			}
			if (!somethingPassed) {
				if (this.seat < 0) {
					plate.direction = 1;
				} else {
					plate.direction = -1;
				}
				var saint = plate.pew.findSaint(plate.seat + plate.direction);
				if (saint) {
					this.passPlate(plate, saint);
				} else {
					plate.direction = 0;
				}
			}
		}
	}
	/**
	* <i>Opportunity:</i> A plate is being passed to you - Do you accept it?
	* @method receivePlate
	* @param {Plate} plate - The plate you're being offered
	*/
	receivePlate(this:Deacon, plate: Plate) {
		plate.move(this.pew, this.seat);
		plate.direction = 0;
		this.plates.push(plate);
		this._passed.push(true);		
		return true;
	}
}
