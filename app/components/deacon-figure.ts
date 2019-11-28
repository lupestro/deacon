import Component from '@ember/component';
import { assert } from '@ember/debug';

import Deacon from '../models/deacon';

/**
* Component to implement the GUI representation of a deacon within the SVG canvas.
*
* 	{deacon-figure x="12" y="24"}
*
*/
export default class DeaconFigure extends Component {
	tagName = '';

	/**
	* The model for the saint
	*/
	model! : Deacon;
	/**
	 * Constructor validates proper construction
	 */
	init() {
		super.init();
		assert("deacon-figure must be created with a model", this.model !== undefined);
	}
}
