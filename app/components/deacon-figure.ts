import Component from '@ember/component';
import { assert } from '@ember/debug';
import { tagName, classNames, attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

import Deacon from '../models/deacon';

/**
* Component to implement the GUI representation of a deacon within the SVG canvas.
*
* 	{deacon-figure x="12" y="24"}
*
*/
@tagName('g')
@classNames('deacon')
export default class DeaconFigure extends Component {
	/**
	* The model for the saint
	*/
	model! : Deacon;
	/**
	* transform SVG attribute for deacon SVG group - computed from x and y of supplied model
	*/	
	@attribute @computed('model.x','model.y') get transform() : string {
		return "translate(" + this.model.x + "," + this.model.y + ")";
	}
	/**
	 * Constructor validates proper construction
	 */
	constructor() {
		super(...arguments);
		assert("deacon-figure must be created with a model", this.model !== undefined);
	}
}
