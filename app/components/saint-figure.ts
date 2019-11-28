import Component from '@ember/component';
import { assert } from '@ember/debug';

import Saint from '../models/saint';

/**
* Component to implement the GUI representation of a saint within the SVG canvas.
*
* 	{{saint-figure x="30" y="50"}}
*
*/
export default class SaintFigure extends Component {
	tagName = '';
	/**
	* The model for the saint
	*/
	model! : Saint;
	/**
	 * Constructor validates proper construction
	 */
	init() {
		super.init();
		assert("saint-figure must be created with a model", this.model !== undefined);
	}
}
