import Saint from './saint';
import Pew from './pew';

type ShorthandLayoutPattern = (number | string)[][];
type ExplicitLayoutPattern = number[][];

/**
* Model of a sanctuary layout.
*/
export default class Layout {
	/**
	* The pattern of pews and the arrangement of saints in those pews supplied upon creation. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	*/
	patternInput? : ShorthandLayoutPattern;	
	/**
	* Models of the {{#crossLink "PewModel"}}pews{{/crossLink}} defined 
	*/
	pews : Pew[];
	/**
	* Models of the {{#crossLink "SaintModel"}}saints{{/crossLink}} defined 
	*/
	saints : Saint[];
	/**
	* The pattern of pews and the arrangement of saints in those pews. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	*/
	pattern : ExplicitLayoutPattern = [];
	constructor (inputPattern: ShorthandLayoutPattern) {
		this.pattern = this._cleanPattern(inputPattern || [[5,0,1,2,3,4], [5,0,1,2,3,4] ]);
		this.pews = this._initializePews(this.pattern);
		this.saints = this._initializeSaints(this.pattern, this.pews);
		// Make saints from pattern
	}
	/**
	* Transform shorthand patterns involving wildcards into patterns with explicit values
	*/
	_cleanPattern(pattern: ShorthandLayoutPattern) : ExplicitLayoutPattern {
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
	* Create pews specified by the pattern
	*/
	_initializePews(pattern: ExplicitLayoutPattern) {
		var newpews : Pew[] = [];
		for (let p = 0, pLen = pattern.length; p < pLen; p++) {
			let numSeats = pattern[p][0];
			let pew = new Pew({x: 30, y: 20 + p * 40, seats: numSeats, width: 0});
			newpews.push(pew);
		}
		return newpews;
	}
	/**
	* Populate pews with saints specified by the pattern
	*/
	_initializeSaints(pattern: ExplicitLayoutPattern, pews: Pew[]) {
		let newsaints = [];
		for (let p = 0, pLen = pews.length; p < pLen; p++) {
			let pewpattern = pattern[p].slice(1), //everything but the count
				pew = pews[p];
			for (let s = 0, sLen = pewpattern.length; s < sLen; s++) {					
				newsaints.push(new Saint(pew, pewpattern[s]));
			}
		}
		return newsaints;
	}
	/**
	* Reset the "fed" state of all the saints in the layout
	*/
	resetFed(this: Layout) {
		for (var s = 0, sLen = this.saints.length; s < sLen; s++) {
			this.saints[s].fed = false;
		}	
	}

}