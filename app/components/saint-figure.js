import Component from '@ember/component';
import { tagName, classNames, attribute } from 'ember-decorators/component';
import { computed } from 'ember-decorators/object';

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
@tagName('g')
@classNames('saint')
export default class SaintFigure extends Component {
	// Tag generation bindings
	/**
	* <i>attribute:</i> used to position the saint SVG group
	* @property x
	* @type number
	*/
	x = this.x || null;
	/**
	* <i>attribute:</i> used to position the saint SVG group
	* @property y
	* @type number
	*/
	y = this.y || null;
	/**
	* transform SVG attribute for saint SVG group - computed from supplied x and y attributes
	* 
	* @property transform
	* @type string
	*/	
	@attribute @computed('x','y') get transform() {
			return "translate(" + this.x + "," + this.y + ")";
	}
}
