import Component from '@ember/component';
import { 
	tagName,
	classNames,
	attribute
  } from 'ember-decorators/component';
  
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
@classNames('sancutary')
export default class SanctuaryDiagram extends Component {

		// Tag generation bindings
	/**
	* <i>attribute:</i> the width of the SVG diagram
	* @property width
	* @type number
	*/	
	@attribute width = null;
	/**
	* <i>attribute:</i> the height of the SVG diagram
	* @property height
	* @type number
	*/	
	@attribute height= null;
	/**
	* <i>attribute:</i> the array of {{#crossLink "PewModel"}}pews{{/crossLink}} to include in the SVG diagram
	* @property pews 
	* @type Array of PewModel
	*/	
	pews = this.pews || [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the SVG diagram
	* @property saints
	* @type Array of SaintModel
	*/	
	saints = this.saints || [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to include in the SVG diagram
	* @property deacons
	* @type Array of DeaconModel
	*/	
	deacons = this.deacons || [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "PlateModel"}}plates{{/crossLink}} to include in the SVG diagram
	* @property plates
	* @type Array of PlateModel
	*/	
	plates = this.plates || [];
}
