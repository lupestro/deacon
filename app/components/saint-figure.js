import Ember from 'ember';
/**
* Ember component representing a saint (parishioner) in an SVG diagram
*
* @module Deacon.Components
* @submodule saint-figure
* @example
* 	{{saint-figure x="30" y="50"}}
*/

/**
* Component to implement the GUI representation of a saint within the SVG canvas.
*
* @class SaintFigure
* @extends Ember.Component
*/
export default Ember.Component.extend({
	// Tag generation bindings
	tagName: 'g',
	classNames: ['saint'],
	attributeBindings: ['transform'],
	/**
	* <i>attribute:</i> used to position the saint SVG group
	* @property x
	* @type number
	*/
	x: null,
	/**
	* <i>attribute:</i> used to position the saint SVG group
	* @property y
	* @type number
	*/
	y: null,
	/**
	* transform SVG attribute for saint SVG group - computed from supplied x and y attributes
	* 
	* @property transform
	* @type string
	*/	
	transform: Ember.computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
