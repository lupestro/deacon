import Ember from 'ember';
/**
* Ember component representing a deacon in an SVG diagram
*
* @module deacon-figure
* @example
* 	{deacon-figure x="12" y="24"}
*/

/**
* Component to implement the GUI representation of a deacon within the SVG canvas.
*
* @class DeaconFigure
* @extends Ember.Component
*/
export default Ember.Component.extend({
	// Tag generation bindings
	tagName: 'g',
	classNames: ['deacon'],
	attributeBindings: ['transform'],
	/**
	* <b>attr:</b> used to position the deacon SVG group
	* @property x
	* @type number
	*/
	x: null,
	/**
	* <b>attr:</b> used to position the deacon SVG group
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
	transform: Ember.computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ") rotate(90,16,16)";
	})
});
