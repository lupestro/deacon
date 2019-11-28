import Component from '@ember/component';
import { assert } from '@ember/debug';

import Plate from '../models/plate';

/**
* Component to implement the GUI representation of a plate within the SVG canvas.
*
* 	{{plate-figure x="30" y="50"}}
*
*/
export default class PlateFigure extends Component {
	tagName='';
	/**
	 * The plate that this represents
	 */
	model! : Plate;
	/**
	 * Constructor validates proper construction
	 */
	init() {
		super.init();
		assert("plate-figure must be created with a model", this.model !== undefined);
	}
}
