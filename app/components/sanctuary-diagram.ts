import Component from '@ember/component';

import Pew from '../models/pew';
import Saint from '../models/saint';
import Deacon from '../models/deacon';
import Plate from '../models/plate';
  
/**
* Component to implement the GUI representation of the sanctuary as an SVG canvas.
* 
* 	{{sanctuary-diagram pews=[model:pew...] saints=[model:saint...] 
*                       deacons=[model:deacon...] plates=[model:plate...] 
*                       width="500" height="600"}}
*
*/
export default class SanctuaryDiagram extends Component {
	tagName = '';
	height? : number;
	width? : number;
	/**
	* the array of {{#crossLink "PewModel"}}pews{{/crossLink}} to include in the SVG diagram
	*/	
	pews? : Pew[];
	/**
	* the array of {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the SVG diagram
	*/	
	saints?: Saint[];
	/**
	* the array of {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to include in the SVG diagram
	*/	
	deacons?: Deacon[];
	/**
	* the array of {{#crossLink "PlateModel"}}plates{{/crossLink}} to include in the SVG diagram
	*/	
	plates? : Plate[];

	_height = 300;
	_width = 400;
	_pews : Pew[] = [];
	_saints: Saint[] = [];
	_deacons: Deacon[] = [];
	_plates : Plate[] = [];

	init() {
		super.init();
		this._height = this.height || 300;
		this._width = this.width || 400;
		this._pews = this.pews || this._pews;
		this._saints = this.saints || this._saints;
		this._deacons = this.deacons || this._deacons;
		this._plates = this.plates || this._plates;
	}
}
