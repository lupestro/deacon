import Component from '@ember/component';
import { tagName, classNames } from 'ember-decorators/component';
import { computed } from 'ember-decorators/object';
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
@tagName('g')
@classNames('deacon')
export default class DeaconFigure extends Component.extend({
	attributeBindings: ['x','y','transform']
})  {
	/**
	* <i>attribute:</i> used to position the deacon SVG group
	* @property x
	* @type number
	*/
	x : number;
	/**
	* <i>attribute:</i> used to position the deacon SVG group
	* @property y
	* @type number
	*/
	y : number;
	/**
	* transform SVG attribute for deacon SVG group - computed from supplied x and y attributes (also rotates 90 degrees)
	* 
	* @property transform
	* @type string
	*/	
	@computed('x','y') get transform() : string {
			return "translate(" + this.x + "," + this.y + ") rotate(90,16,16)";
	}
}
