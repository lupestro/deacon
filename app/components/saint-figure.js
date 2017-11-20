import { computed } from '@ember/object';
import Component from '@ember/component';
/**
* @module Deacon.Components
*/

/**
* Component to implement the GUI representation of a saint within the SVG canvas.
*
* 	{{saint-figure x="30" y="50"}}
*
* @class SaintFigure
* @extends Ember.Component
*/
export default Component.extend({
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
	transform: computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
