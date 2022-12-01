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
		for (const element of pattern) {
			let subpattern : number[] = []; 
			if (element.length === 2 && element[1]==='*') {
				var curr = 0, high = element[0];
				if (typeof high === 'number') {
					subpattern.push(high);
				}
				while(high && curr < high){
					subpattern.push(curr++);
				}
			} else {
				for (let s = 0, sLen = element.length; s < sLen; s++) {
					var item = element[s];
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
		for (const [index, element] of pattern.entries()) {
			let numSeats = element[0];
			let pew = new Pew({x: 30, y: 20 + index * 40, seats: numSeats, width: 0});
			newpews.push(pew);
		}
		return newpews;
	}
	/**
	* Populate pews with saints specified by the pattern
	*/
	_initializeSaints(pattern: ExplicitLayoutPattern, pews: Pew[]) {
		let newsaints = [];
		for (const [index, element] of pattern.entries()) {
			let pewpattern = element.slice(1), //everything but the count
				pew = pews[index];
			for (let saintinfo of pewpattern) {
				if (pew) {
					newsaints.push(new Saint(pew, saintinfo));
				}				
			}
		}
		return newsaints;
	}
	/**
	* Reset the "fed" state of all the saints in the layout
	*/
	resetFed(this: Layout) {
		for (var saint of this.saints) {
			saint.fed = false;
		}	
	}

}