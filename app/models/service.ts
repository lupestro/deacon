import EmberObject from '@ember/object';
import Deacon from './deacon';
import Plate from './plate';
import Layout from './layout';
import Pew from 'deacon/models/pew';
/**
* @module Deacon.Models
*/
type ExternalLayoutPattern = (number | string)[][];
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
	stageName : string = "Offertory";
	/**
	* Height on screen of the entire service 
	* @property height
	* @type number
	* @default determined by geometry of pews
	*/
	height : number;
	/**
	* Width on screen of the entire service  
	* @property width
	* @type string
	* @default determined by geometry of pews
	*/
	width : number;
	/**
	* The pattern of pews and the arrangement of saints in those pews. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	* @property pattern
	* @type string
	* @default two pews filled with five saints each
	*/
	pattern : ExternalLayoutPattern;
	/**
	* Model of internal layout of the service, including all pews and saints
	* @property layout
	* @type LayoutModel
	* @private
	* @default Whatever layout is specified by the pattern
	*/
	layout : Layout;
	/**
	* Models of the {{#crossLink "DeaconModel"}}deacons{{/crossLink}} defined 
	* @property deacons
	* @type Array of DeaconModel
	* @default Deacon to the left of the front row and one to the right of the row behind it
	*/
	deacons : Deacon[];
	/**
	* Models of the {{#crossLink "PlateModel"}}plates{{/crossLink}} defined 
	* @property plates
	* @type Array of Plate
	* @default A plate in the hands of each deacon
	*/
	plates : Plate[];
	/**
	* Initialize the model with defaults for any information not supplied
	* @method constructor
	* @private
	* @return whatever its parent returns
	*/
	constructor (pattern : ExternalLayoutPattern) {
		super(...arguments);

		this.pattern = pattern || [ [5,"*"], [5,"*"]];
		this.layout = new Layout(this.pattern);
		var pews = this.layout.pews;
		this.height = 40 + pews.length * 40;
		this.width = 60 + pews.reduce( (prev, pew) => { return Math.max(prev, pew.get('width')); }, 0);

		var pew0 =  pews[pews.length-1],
			pew1 = pews[pews.length-2];

		var plate0 = new Plate({pew:pew0, seat:-1}),
			plate1 = new Plate({pew: pew1, seat:1000000});
		this.plates = [ plate0, plate1 ];

		this.deacons = [
			new Deacon({pew: pew0, seat: -1, plates:[ plate0 ]}),
			new Deacon({pew: pew1, seat: 1000000, plates: [ plate1 ]})
		]; 
	}
	/**
	* Get the number of seats in the pew with the specified index
	* @method getPewSeats
	* @deprecated Use the pew directly to get its seats
	* @param {number} index of the pew
	* @return {number} the number of seats in the pew
	*/
	getPewSeats(pewIndex: number): number {
		var thismodel : ServiceModel = this;
		var pews = thismodel.get('layout').pews;
		if (pewIndex < 0 || pewIndex >= pews.length) {
			return 0;
		}
		else {
			return pews[pewIndex].get('seats');
		}
	}
	/**
	* Reset the position and condition of the deacons and the plates
	* @method resetPlatesAndDeacons
	*/
	resetPlatesAndDeacons () {
		var thismodel : ServiceModel = this;
		var pews = thismodel.get('layout').pews;
		this.plates[0].reset();
		this.plates[1].reset();
		this.deacons[0].reset ([this.plates[0]], pews[pews.length-1]);
		this.deacons[1].reset ([this.plates[1]], pews[pews.length-2]);
	}
}