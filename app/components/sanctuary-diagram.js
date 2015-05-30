import Ember from 'ember';
/**
* Ember component representing an SVG diagram of a collection of pews in a sanctuary.
*
* This module's template uses components 
* {{#crossLinkModule "pew-figure"}}{{/crossLinkModule}}, 
* {{#crossLinkModule "saint-figure"}}{{/crossLinkModule}}, 
* {{#crossLinkModule "deacon-figure"}}{{/crossLinkModule}},and 
* {{#crossLinkModule "plate-figure"}}{{/crossLinkModule}}.
*
* @module Deacon.Components
* @submodule sanctuary-diagram
* @example
* 	{{sanctuary-diagram pews=[model:pew...] saints=[model:saint...] 
*                       deacons=[model:deacon...] plates=[model:plate...] 
*                       width="500" height="600"}}
*/

/**
* Component to implement the GUI representation of the sanctuary as an SVG canvas.
* 
* @class SanctuaryDiagram
* @extends Ember.Component
*/
export default Ember.Component.extend({
	// Tag generation bindings
	tagName: 'svg',
	classNames: ['sanctuary'],
	attributeBindings: ['width','height'],
	/**
	* <i>attribute:</i> the width of the SVG diagram
	* @property width
	* @type number
	*/	
	width: null,
	/**
	* <i>attribute:</i> the height of the SVG diagram
	* @property height
	* @type number
	*/	
	height: null,
	/**
	* <i>attribute:</i> the array of {{#crossLink "PewModel"}}pews{{/crossLink}} to include in the SVG diagram
	* @property pews 
	* @type Array of PewModel
	*/	
	pews: null,
	/**
	* <i>attribute:</i> the array of {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the SVG diagram
	* @property saints
	* @type Array of SaintModel
	*/	
	saints: null,
	/**
	* <i>attribute:</i> the array of {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to include in the SVG diagram
	* @property deacons
	* @type Array of DeaconModel
	*/	
	deacons: null,
	/**
	* <i>attribute:</i> the array of {{#crossLink "PlateModel"}}plates{{/crossLink}} to include in the SVG diagram
	* @property plates
	* @type Array of PlateModel
	*/	
	plates: null

});
