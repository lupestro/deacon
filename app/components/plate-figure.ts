import Component from '@ember/component';
import { tagName, classNames, attribute } from 'ember-decorators/component';
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
export default class PlateFigure extends Component {	
	/**
	* <i>attribute:</i> used to position the plate SVG group
	* @property x
	* @type number
	*/
	x : number | null = this.x || null;
	/**
	* <i>attribute:</i> used to position the plate SVG group
	* @property y
	* @type number
	*/
	y : number | null = this.y || null;
	/**
	* transform SVG attribute for plate SVG group - computed from supplied x and y attributes
	* 
	* @property transform
	* @type string
	*/	
	@attribute @computed('x','y') get transform() : string {
			return "translate(" + this.x + "," + this.y + ")";
	}
}
