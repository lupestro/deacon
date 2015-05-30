import Ember from 'ember';
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
* @extends Ember.Object
*/
export default Ember.Object.extend({
	/**
	* Name of current stage of service 
	* @property stageName
	* @type string
	* @default "Offertory"
	*/
	stageName: null,
	/**
	* Height on screen of the entire service 
	* @property height
	* @type number
	* @default determined by geometry of pews
	*/
	height: null,
	/**
	* Width on screen of the entire service  
	* @property width
	* @type string
	* @default determined by geometry of pews
	*/
	width: null,
	/**
	* Model of internal layout of the service, including all pews and saints
	* @property layout
	* @type LayoutModel
	* @private
	* @default Whatever layout is specified by the pattern
	*/
	layout: null,
	/**
	* Models of the {{#crossLink "DeaconModel"}}deacons{{/crossLink}} defined 
	* @property deacons
	* @type Array of DeaconModel
	* @default Deacon to the left of the front row and one to the right of the row behind it
	*/
	deacons: null,
	/**
	* Models of the {{#crossLink "PlateModel"}}plates{{/crossLink}} defined 
	* @property plates
	* @type Array of Plate
	* @default A plate in the hands of each deacon
	*/
	plates: null,
	/**
	* The pattern of pews and the arrangement of saints in those pews. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	* @property pattern
	* @type string
	* @default two pews filled with five saints each
	*/
	pattern: null,
	/**
	* Initialize the model with defaults for any information not supplied
	* @function init
	* @private
	* @return whatever its parent returns
	*/
	init: function() {
		if (this.get('stageName') === null) {
			this.set('stageName', "Offertory");
		}
		if (this.get('pattern') === null) {
			this.set('pattern',[ [5,"*"], [5,"*"]]);
		}
		if (this.get('layout') === null) {
			this.set('layout', Layout.create({pattern: this.get('pattern')}));
		}
		var pews = this.get('layout').pews;
		var pew0 =  pews[pews.length-1],
			pew1 = pews[pews.length-2];
		if (this.get('plates') === null) {
			var plates = [];
			plates.push(Plate.create({ seat: -1, pew: pew0}));
			plates.push(Plate.create({ seat: 1000000, pew: pew1}));
			this.set('plates', plates);
		}
		if (this.get('deacons') === null) {
			var deacons = []; 
			deacons.push(Deacon.create({ seat: -1, pew: pew0, plates: [ this.plates[0] ]}));
			deacons.push(Deacon.create({ seat: 1000000, pew: pew1, plates: [ this.plates[1] ]}));
			this.set('deacons', deacons);
		}
		if (this.get('height') === null) {
			this.set('height', 40 + pews.length * 40);
		}
		if (this.get('width') === null) {
			var width = pews.reduce(function (prev, pew) { return Math.max(prev, pew.get('width')); }, 0);
			this.set('width', 60 + width);
		}
		return this._super();
	},
	/**
	* Get the number of seats in the pew with the specified index
	* @function getPewSeats
	* @deprecated Use the pew directly to get its seats
	* @param {number} index of the pew
	* @return {number} the number of seats in the pew
	*/
	getPewSeats: function(pew) {
		var pews = this.get('layout').pews;
		if (pew < 0 || pew >= pews.length) {
			return 0;
		} else {
			return pews[pew].get('seats');
		}
	},
	/**
	* Reset the position and condition of the deacons and the plates
	* @function resetPlatesAndDeacons
	*/
	resetPlatesAndDeacons: function() {
		var pews = this.get('layout').pews;
		this.plates[0].reset();
		this.plates[1].reset();
		this.deacons[0].reset ([this.plates[0]], pews[pews.length-1]);
		this.deacons[1].reset ([this.plates[1]], pews[pews.length-2]);
	}
});
