import Component from '@ember/component';
import { tagName, classNames } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
//import { argument } from '@ember-decorators/argument';

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
@tagName('g')
@classNames('pew')
export default class PewFigure extends Component.extend({
	attributeBindings:['x','y','transform']
}) {
	/**
	* <i>attribute:</i> used to position the pew SVG group
	* @property x
	* @type number
	*/
	x : number;
	/**
	* <i>attribute:</i> used to position the pew SVG group
	* @property y
	* @type number
	*/
	y : number;
	/**
	* <i>attribute:</i> used to set the width of the elements in the pew SVG group
	* @property width
	* @type number
	*/
	/*@argument*/ width;
	/**
	* transform SVG attribute for pew SVG group - computed from x and y attributes 
	* 
	* @property transform
	* @type string
	*/	
	@computed('x','y') get transform() : string {
			return "translate(" + this.x + "," + this.y + ")";
	}
}
