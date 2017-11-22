import EmberObject from '@ember/object';
import Saint from './saint';
import Pew from './pew';

/**
* @module Deacon.Models
*/

type ExternalLayoutPattern = (number | string)[][];
type InternalLayoutPattern = number[][];

/**
* Model of a sanctuary layout.
* 
* @class LayoutModel
* @extends ember/object
*/
export default class Layout extends EmberObject {
	/**
	* Models of the {{#crossLink "PewModel"}}pews{{/crossLink}} defined 
	* @property pews
	* @type Array of PewModel
	* @default Number and arrangement of pews determined by the pattern
	*/
	pews : Pew[];
	/**
	* Models of the {{#crossLink "SaintModel"}}saints{{/crossLink}} defined 
	* @property saints
	* @type Array of SaintModel
	* @default Number and arrangement of saints determined by the pattern
	*/
	saints : Saint[];
	/**
	* The pattern of pews and the arrangement of saints in those pews. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	* @property pattern
	* @type string
	* @default two pews filled with five saints each
	*/
	pattern : InternalLayoutPattern;
	/**
	* Initialize the model with defaults for any information not supplied
	* @method constructor
	* @private
	* @return whatever its parent returns
	*/
	constructor(pattern: ExternalLayoutPattern) {
		super(...arguments);
		this.pattern = this.cleanPattern(pattern || [[5,0,1,2,3,4], [5,0,1,2,3,4] ]);
		var thismodel : Layout = this;
		// Clean out "*" shorthand
		// Make pews from pattern
		var newpews : Pew[] = [];
		for (let p = 0, pLen = this.pattern.length; p < pLen; p++) {
			let numSeats = this.pattern[p][0];
			newpews.push(
				new Pew( {x: 30, y: 20 + p * 40, seats: numSeats, width: 0}));
		}
		thismodel.set('pews', newpews);

		// Make saints from pattern
		if (!this.saints) {
			let newsaints = [];
			for (let p = 0, pLen = this.pews.length; p < pLen; p++) {
				let pewpattern = this.pattern[p].slice(1), //everything but the count
					pew = this.pews[p];
				for (let s = 0, sLen = pewpattern.length; s < sLen; s++) {					
					newsaints.push(new Saint ( {pew: pew, seat: pewpattern[s]} ));
				}
			}
			thismodel.set('saints',newsaints);
		}
	}
	cleanPattern(pattern: ExternalLayoutPattern) : InternalLayoutPattern {
		var newpattern : number [][] = [];
		for (let p = 0, pLen = pattern.length; p < pLen; p++) {
			let subpattern : number[] = []; 
			if (pattern[p].length === 2 && pattern[p][1]==='*') {
				var curr = 0, high = pattern[p][0];
				if (typeof high === 'number') {
					subpattern.push(high);
				}
				while(curr < high){
					subpattern.push(curr++);
				}
			} else {
				for (let s = 0, sLen = pattern[p].length; s < sLen; s++) {
					var item = pattern[p][s];
					if (typeof item === 'number') {
						subpattern.push(item);						
					}
				}
			}
			newpattern.push(subpattern);
		}
		return newpattern;
	}
	/**
	* Reset the "fed" state of all the saints in the layout
	* @method resetFed
	*/
	resetFed() {
		for (var s = 0, sLen = this.saints.length; s < sLen; s++) {
			this.saints[s].set('fed', false);
		}
	}

}