import Component from '@ember/component';
import { assert } from '@ember/debug';
import { tagName, classNames, attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

import Saint from '../models/saint';

/**
* Component to implement the GUI representation of a saint within the SVG canvas.
*
* 	{{saint-figure x="30" y="50"}}
*
*/
@tagName('g')
@classNames('saint')
export default class SaintFigure extends Component {
	/**
	* The model for the saint
	*/
	model! : Saint;
	/**
	* transform SVG attribute for saint SVG group - computed from x and y of supplied model
	*/	
	@attribute @computed('model.x','model.y') get transform() : string {
			return "translate(" + this.model.x + "," + this.model.y + ")";
	}
	/**
	 * Constructor validates proper construction
	 */
	constructor() {
		super(...arguments);
		assert("saint-figure must be created with a model", this.model !== undefined);
	}
}
