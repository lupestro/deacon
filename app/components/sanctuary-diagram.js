import Component from '@ember/component';
import { tagName, classNames, attribute} from 'ember-decorators/component';
import { argument } from '@ember-decorators/argument';

//import Pew from 'deacon/models/pew';
//import Saint from 'deacon/models/saint';
//import Deacon from 'deacon/models/deacon';
//import Plate from 'deacon/models/plate';
  
/**
* Components for depicting the animated congregation in SVG
* 
* @module Deacon.Components
*/

/**
* Component to implement the GUI representation of the sanctuary as an SVG canvas.
*
* This module's template uses components 
* {{#crossLink "PewFigure"}}{{/crossLink}}, 
* {{#crossLink "SaintFigure"}}{{/crossLink}}, 
* {{#crossLink "DeaconFigure"}}{{/crossLink}},and 
* {{#crossLink "PlateFigure"}}{{/crossLink}}.
*
* 
* 	{{sanctuary-diagram pews=[model:pew...] saints=[model:saint...] 
*                       deacons=[model:deacon...] plates=[model:plate...] 
*                       width="500" height="600"}}
*
* @class SanctuaryDiagram
* @extends Ember.Component
*/
@tagName('svg')
@classNames('sanctuary')
export default class SanctuaryDiagram extends Component {

		// Tag generation bindings
	/**
	* <i>attribute:</i> the width of the SVG diagram
	* @property width
	* @type number
	*/	
	@attribute width = 400;
	/**
	* <i>attribute:</i> the height of the SVG diagram
	* @property height
	* @type number
	*/	
	@attribute height = 300;
	/**
	* <i>attribute:</i> the array of {{#crossLink "PewModel"}}pews{{/crossLink}} to include in the SVG diagram
	* @property pews 
	* @type Array of PewModel
	*/	
	@argument pews = [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the SVG diagram
	* @property saints
	* @type Array of SaintModel
	*/	
	@argument saints  = [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to include in the SVG diagram
	* @property deacons
	* @type Array of DeaconModel
	*/	
	@argument deacons  = [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "PlateModel"}}plates{{/crossLink}} to include in the SVG diagram
	* @property plates
	* @type Array of PlateModel
	*/	
	@argument plates  = [];
}
