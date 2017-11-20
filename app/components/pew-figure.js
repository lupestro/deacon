import { computed } from '@ember/object';
import Component from '@ember/component';
/**
* @module Deacon.Components
*/

/**
* Component to implement the GUI representation of a pew within the SVG canvas.
*
* 	{{pew-figure x="30" y="50" width="200"}}
*
* @class PewFigure
* @extends Ember.Component
*/
export default Component.extend({
	// Tag generation bindings
	tagName: 'g',
	classNames: ['pew'],
	attributeBindings: ['transform'],
	/**
	* <i>attribute:</i> used to position the pew SVG group
	* @property x
	* @type number
	*/
	x: null,
	/**
	* <i>attribute:</i> used to position the pew SVG group
	* @property y
	* @type number
	*/
	y: null,
	/**
	* <i>attribute:</i> used to set the width of the elements in the pew SVG group
	* @property width
	* @type number
	*/
	width: null,
	/**
	* transform SVG attribute for pew SVG group - computed from x and y attributes 
	* 
	* @property transform
	* @type string
	*/	
	transform: computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
