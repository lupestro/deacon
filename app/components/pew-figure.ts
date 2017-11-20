import Component from '@ember/component';
import { tagName, classNames, attribute } from 'ember-decorators/component';
import { computed } from 'ember-decorators/object';

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
export default class PewFigure extends Component {
	/**
	* <i>attribute:</i> used to position the pew SVG group
	* @property x
	* @type number
	*/
	x : number | null = this.x || null;
	/**
	* <i>attribute:</i> used to position the pew SVG group
	* @property y
	* @type number
	*/
	y : number | null = this.y || null;
	/**
	* <i>attribute:</i> used to set the width of the elements in the pew SVG group
	* @property width
	* @type number
	*/
	width : number | null = this.width || null;
	/**
	* transform SVG attribute for pew SVG group - computed from x and y attributes 
	* 
	* @property transform
	* @type string
	*/	
	@attribute @computed('x','y') get transform() : string {
			return "translate(" + this.x + "," + this.y + ")";
	}
}
