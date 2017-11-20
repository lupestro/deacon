import { computed } from '@ember/object';
import Component from '@ember/component';
/**
* @module Deacon.Components
*/

/**
* Component to implement the GUI representation of a deacon within the SVG canvas.
*
* 	{deacon-figure x="12" y="24"}
*
* @class DeaconFigure
* @extends Ember.Component
*/
export default Component.extend({
	// Tag generation bindings
	tagName: 'g',
	classNames: ['deacon'],
	attributeBindings: ['transform'],
	/**
	* <i>attribute:</i> used to position the deacon SVG group
	* @property x
	* @type number
	*/
	x: null,
	/**
	* <i>attribute:</i> used to position the deacon SVG group
	* @property y
	* @type number
	*/
	y: null,
	/**
	* transform SVG attribute for deacon SVG group - computed from supplied x and y attributes (also rotates 90 degrees)
	* 
	* @property transform
	* @type string
	*/	
	transform: computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ") rotate(90,16,16)";
	})
});
