import Component from '@ember/component';
import { assert } from '@ember/debug';
import { tagName, classNames, attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';

import Pew from '../models/pew';

/**
* Component to implement the GUI representation of a pew within the SVG canvas.
*
* 	{{pew-figure x="30" y="50" width="200"}}
*
*/
@tagName('g')
@classNames('pew')
export default class PewFigure extends Component {
	/**
	* The model for the saint
	*/
	model! : Pew;
	/**
	* <i>attribute:</i> used to position the saint SVG group
	*/
	@attribute @alias('model.width') width! : number;
	/**
	* transform SVG attribute for pew SVG group - ccomputed from x and y of supplied model
	*/	
	@attribute @computed('model.x','model.y') get transform() : string {
			return "translate(" + this.model.x + "," + this.model.y + ")";
	}
	/**
	 * Constructor validates proper construction
	 */
	constructor() {
		super(...arguments);
		assert("pew-figure must be created with a model", this.model !== undefined);
	}

}
