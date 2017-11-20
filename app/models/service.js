import EmberObject from '@ember/object';
import Deacon from './deacon';
import Plate from './plate';
import Layout from './layout';
/**
* @module Deacon.Models
*/

/**
* Master model for the service controller and route.
* 
* @class ServiceModel
* @extends ember/object
*/
export default class ServiceModel extends EmberObject {
	/**
	* Name of current stage of service 
	* @property stageName
	* @type string
	* @default "Offertory"
	*/
	stageName = this.stageName || "Offertory";
	/**
	* Height on screen of the entire service 
	* @property height
	* @type number
	* @default determined by geometry of pews
	*/
	height = this.height || null;
	/**
	* Width on screen of the entire service  
	* @property width
	* @type string
	* @default determined by geometry of pews
	*/
	width = this.width || null;
	/**
	* The pattern of pews and the arrangement of saints in those pews. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	* @property pattern
	* @type string
	* @default two pews filled with five saints each
	*/
	pattern = this.pattern || [ [5,"*"], [5,"*"]];
	/**
	* Model of internal layout of the service, including all pews and saints
	* @property layout
	* @type LayoutModel
	* @private
	* @default Whatever layout is specified by the pattern
	*/
	layout = this.layout || Layout.create({pattern: this.pattern});
	/**
	* Models of the {{#crossLink "DeaconModel"}}deacons{{/crossLink}} defined 
	* @property deacons
	* @type Array of DeaconModel
	* @default Deacon to the left of the front row and one to the right of the row behind it
	*/
	deacons = this.deacons || null;
	/**
	* Models of the {{#crossLink "PlateModel"}}plates{{/crossLink}} defined 
	* @property plates
	* @type Array of Plate
	* @default A plate in the hands of each deacon
	*/
	plates = this.plates || null;
	/**
	* Initialize the model with defaults for any information not supplied
	* @method constructor
	* @private
	* @return whatever its parent returns
	*/
	constructor () {
		super(...arguments);

		var pews = this.layout.pews;
		this.height = this.height || 40 + pews.length * 40;
		this.width = this.width || 60 + pews.reduce( (prev, pew) => { 
				return Math.max(prev, pew.get('width')); 
			}, 0);

		var pew0 =  pews[pews.length-1],
			pew1 = pews[pews.length-2];
		this.plates = this.plates || [
			Plate.create({ seat: -1, pew: pew0}),
			Plate.create({ seat: 1000000, pew: pew1})
		];
		this.deacons = this.deacons || [
			Deacon.create({ 
				seat: -1,
				pew: pew0, 
				plates: [ this.plates[0] ]
			}),
			Deacon.create({
				seat: 1000000, 
				pew: pew1, 
				plates: [ this.plates[1] ]
			})
		]; 
	}
	/**
	* Get the number of seats in the pew with the specified index
	* @method getPewSeats
	* @deprecated Use the pew directly to get its seats
	* @param {number} index of the pew
	* @return {number} the number of seats in the pew
	*/
	getPewSeats(pew) {
		var pews = this.get('layout').pews;
		if (pew < 0 || pew >= pews.length) {
			return 0;
		} else {
			return pews[pew].get('seats');
		}
	}
	/**
	* Reset the position and condition of the deacons and the plates
	* @method resetPlatesAndDeacons
	*/
	resetPlatesAndDeacons () {
		var pews = this.get('layout').pews;
		this.plates[0].reset();
		this.plates[1].reset();
		this.deacons[0].reset ([this.plates[0]], pews[pews.length-1]);
		this.deacons[1].reset ([this.plates[1]], pews[pews.length-2]);
	}
}