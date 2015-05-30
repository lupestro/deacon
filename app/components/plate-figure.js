import Ember from 'ember';
/**
* Ember component representing a plate in an SVG diagram
*
* @module Deacon.Components
* @submodule plate-figure
* @example
* 	{{plate-figure x="30" y="50"}}
*/

/**
* Component to implement the GUI representation of a plate within the SVG canvas.
*
* @class PlateFigure
* @extends Ember.Component
*/
export default Ember.Component.extend({
	// Tag generation bindings
	tagName: 'g',
	classNames: ['plate'],
	attributeBindings: ['transform'],
	/**
	* <i>attribute:</i> used to position the plate SVG group
	* @property x
	* @type number
	*/
	x: null,
	/**
	* <i>attribute:</i> used to position the plate SVG group
	* @property y
	* @type number
	*/
	y: null,
	/**
	* transform SVG attribute for plate SVG group - computed from supplied x and y attributes
	* 
	* @property transform
	* @type string
	*/	
	transform: Ember.computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
