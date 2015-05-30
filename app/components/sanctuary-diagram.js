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
* @module sanctuary-diagram
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
	* <b>attr:</b> the width of the SVG diagram
	* @property width
	* @type number
	*/	
	width: null,
	/**
	* <b>attr:</b> the height of the SVG diagram
	* @property height
	* @type number
	*/	
	height: null,
	/**
	* <b>attr:</b> the array of pews to include in the SVG diagram
	* @property pews 
	* @type Array of PewModel
	*/	
	pews: null,
	/**
	* <b>attr:</b> the array of saints to include in the SVG diagram
	* @property saints
	* @type Array of SaintModel
	*/	
	saints: null,
	/**
	* <b>attr:</b> the array of deacons to include in the SVG diagram
	* @property deacons
	* @type Array of DeaconModel
	*/	
	deacons: null,
	/**
	* <b>attr:</b> the array of plates to include in the SVG diagram
	* @property plates
	* @type Array of PlateModel
	*/	
	plates: null

});
