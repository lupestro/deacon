import Ember from 'ember';
/**
* Ember component representing a pew in an SVG diagram
*
* @module pew-figure
* @example
* 	{{pew-figure x="30" y="50" width="200"}}
*/

/**
* Component to implement the GUI representation of a pew within the SVG canvas.
*
* @class PewFigure
* @extends Ember.Component
*/
export default Ember.Component.extend({
	// Tag generation bindings
	tagName: 'g',
	classNames: ['pew'],
	attributeBindings: ['transform'],
	/**
	* <b>attr:</b> used to position the pew SVG group
	* @property x
	* @type number
	*/
	x: null,
	/**
	* <b>attr:</b> used to position the pew SVG group
	* @property y
	* @type number
	*/
	y: null,
	/**
	* <b>attr:</b> used to set the width of the elements in the pew SVG group
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
	transform: Ember.computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
