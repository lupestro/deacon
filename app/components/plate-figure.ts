import Component from '@ember/component';
import { tagName, classNames } from 'ember-decorators/component';
import { computed } from 'ember-decorators/object';
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
@tagName('g')
@classNames('plate')
export default class PlateFigure extends Component.extend({
	attributeBindings:['x','y','transform']
}) {	
	/**
	* <i>attribute:</i> used to position the plate SVG group
	* @property x
	* @type number
	*/
	x : number;
	/**
	* <i>attribute:</i> used to position the plate SVG group
	* @property y
	* @type number
	*/
	y : number;
	/**
	* transform SVG attribute for plate SVG group - computed from supplied x and y attributes
	* 
	* @property transform
	* @type string
	*/	
	@computed('x','y') get transform() : string {
			return "translate(" + this.x + "," + this.y + ")";
	}
}
