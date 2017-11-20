import Component from '@ember/component';
import { tagName, classNames, attribute } from 'ember-decorators/component';
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
export default class DeaconFigure extends Component {
	/**
	* <i>attribute:</i> used to position the deacon SVG group
	* @property x
	* @type number
	*/
	x = (typeof this.x !== 'undefined') ? this.x : null;
	/**
	* <i>attribute:</i> used to position the deacon SVG group
	* @property y
	* @type number
	*/
	y = (typeof this.y !== 'undefined') ? this.y : null;
	/**
	* transform SVG attribute for deacon SVG group - computed from supplied x and y attributes (also rotates 90 degrees)
	* 
	* @property transform
	* @type string
	*/	
	@attribute @computed('x','y') get transform() {
			return "translate(" + this.x + "," + this.y + ") rotate(90,16,16)";
	}
}
