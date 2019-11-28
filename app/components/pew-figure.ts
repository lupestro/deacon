import Component from '@ember/component';
import { assert } from '@ember/debug';

import Pew from '../models/pew';

/**
* Component to implement the GUI representation of a pew within the SVG canvas.
*
* 	{{pew-figure x="30" y="50" width="200"}}
*
*/
export default class PewFigure extends Component {
	tagName = "";
	/**
	* The model for the saint
	*/
	model! : Pew;
	/**
	 * Constructor validates proper construction
	 */
	init() {
		super.init();
		assert("pew-figure must be created with a model", this.model !== undefined);
	}

}
