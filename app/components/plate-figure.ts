import Component from '@ember/component';
import { assert } from '@ember/debug';
import { tagName, classNames, attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

import Plate from '../models/plate';

/**
* Component to implement the GUI representation of a plate within the SVG canvas.
*
* 	{{plate-figure x="30" y="50"}}
*
*/
@tagName('g')
@classNames('plate')
export default class PlateFigure extends Component {
	/**
	 * The plate that this represents
	 */
	model! : Plate;
	/**
	* transform SVG attribute for plate SVG group - ccomputed from x and y of supplied model
	* 
	* @property transform
	* @type string
	*/	
	@attribute @computed('model.x','model.y') get transform() : string {
			return "translate(" + this.model.x + "," + this.model.y + ")";
	}
	/**
	 * Constructor validates proper construction
	 */
	constructor() {
		super(...arguments);
		assert("plate-figure must be created with a model", this.model !== undefined);
	}
}
