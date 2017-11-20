import { computed } from '@ember/object';
import Component from '@ember/component';
/**
* @module Deacon.Components
*/

/**
* Component to implement the GUI representation of a plate within the SVG canvas.
*
* 	{{plate-figure x="30" y="50"}}
*
* @class PlateFigure
* @extends Ember.Component
*/
export default Component.extend({
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
	transform: computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
