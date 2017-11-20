import EmberObject from '@ember/object';
import Pew from 'deacon/models/pew';
import Plate from 'deacon/models/plate';
import { INeighbor } from 'deacon/models/saint';
/**
* @module Deacon.Models
*/

/**
* Model of a deacon.
* 
* @class DeaconModel
* @extends Ember.Object
*/
export default class Deacon extends EmberObject {
	/**
	* The horizontal position of the deacon within the diagram.
	* @property x
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	x : number | null = (typeof this.x !== 'undefined') ? this.x : null;
	/**
	* The vertical position of the deacon within the diagram.
	* @property y
	* @type number
	* @default a position determined by a pew and seat, if provided
	*/
	y : number | null = (typeof this.y !== 'undefined') ? this.y : null;
	/**
	* The pew by which the deacon currently resides.
	* @property pew
	* @type PewModel
	*/
	pew : Pew | null = this.pew || null;
	/**
	* The seat in the pew where the deacon currently resides. Typically -1 or pew.seats.
	* @property seat
	* @type number
	*/
	seat : number | null = (typeof this.seat !== 'undefined') ? this.seat : null;
	/**
	* The {{#crossLink "PlateModel"}}plates{{/crossLink}} that the deacon is currently holding 
	* @property plates
	* @type Array of PlateModel
	*/
	plates : Plate[] = this.plates || [];
	/**
	* For each plate, whether this deacon received it on this row. Internal bookkeeping
	* @property _passed
	* @type Array of boolean
	*/
	_passed : boolean[] = this._passed || [];
	/**
	* Initialize the model with defaults for any information not supplied
	* @method init
	* @private
	* @return whatever its parent returns
	*/
	constructor() {
		super(...arguments);		
		if (this.seat !== null && this.pew !== null) {
			if (this.seat > this.pew.get('seats')) {
				this.seat = this.pew.get('seats');
			} else if (this.seat < -1) {
				this.seat = -1;
			}
		}
		if (this.plates !== null) {
			this._passed = [];
			for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
				this._passed.push(false);
			}
		}
		if (this.x === null || this.y === null) {
			this.move(this.pew);
		}
	}
	/**
	* Reset state to supplied state
	* @method reset
	* @param {Array of PlateModel} plates - The {{#crossLink "PlateModel"}}plates{{/crossLink}} to hold
	* @param {Pew} pew - The pew to stand next to
	*/
	reset(plates : Plate[], pew: Pew) {
		var thismodel : Deacon = this;
		thismodel.set('plates', plates);
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
	move(pew : Pew){
		var thismodel : Deacon = this;		
		if (this.pew !== null) {		
			this.pew.removeDeacon(this);
		}
		thismodel.set('pew',pew);
		thismodel.set('seat', pew.getDeaconSeat(this));
		var coords = pew.getDeaconPosition(this.seat);
		thismodel.set('x',coords.x);
		thismodel.set('y',coords.y);
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
	* @param {SaintModel|Deacon} neighbor - The neighbor to which to pass the plate
	*/
	passPlate(plate: Plate, neighbor : INeighbor){
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
	plateArriving(plate: Plate) {
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
	plateInHands(plate: Plate, pews: Pew[]) {
		if (plate.pew.allAreFed()) { // Time to move on to another pew
			var p = pews.indexOf(plate.pew);
			while (--p >= 0) {
				if (!pews[p].allAreFed()) {
					this.move(pews[p]);
					break;
				}
			}
		} else if (!plate.pew.hasPlateInMotion() && this.plates.indexOf(plate) >= 0) {
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
	receivePlate(plate: Plate) {
		plate.move(this.pew, this.seat);
		plate.direction = 0;
		this.plates.push(plate);
		this._passed.push(true);		
		return true;
	}
}
