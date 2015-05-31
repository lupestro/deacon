import Ember from 'ember';
import Saint from './saint';
import Pew from './pew';
/**
* @module Deacon.Models
*/

/**
* Model of a sanctuary layout.
* 
* @class LayoutModel
* @extends Ember.Object
*/
export default Ember.Object.extend({
	/**
	* Models of the {{#crossLink "PewModel"}}pews{{/crossLink}} defined 
	* @property pews
	* @type Array of PewModel
	* @default Number and arrangement of pews determined by the pattern
	*/
	pews: null,
	/**
	* Models of the {{#crossLink "SaintModel"}}saints{{/crossLink}} defined 
	* @property saints
	* @type Array of SaintModel
	* @default Number and arrangement of saints determined by the pattern
	*/
	saints: null,
	/**
	* The pattern of pews and the arrangement of saints in those pews. 
	* See {{#crossLink "ServiceRoute"}}{{/crossLink}} for details.
	* @property pattern
	* @type string
	* @default two pews filled with five saints each
	*/
	pattern: null,
	/**
	* Initialize the model with defaults for any information not supplied
	* @method init
	* @private
	* @return whatever its parent returns
	*/
	init: function() {
		if (this.pattern === null) {
			this.pattern = [ [5,0,1,2,3,4], [5,0,1,2,3,4] ];
		}
		// Clean out "*" shorthand
		for (var pt = 0, ptLen = this.pattern.length; pt < ptLen; pt++) {
			if (this.pattern[pt].length === 2 && this.pattern[pt][1]==='*') {
				var curr = 1, high=this.pattern[pt][0];
				this.pattern[pt][1] = 0;
				while(curr < high){
				   this.pattern[pt].push(curr++);
				}
			}
		}
		var pattern = this.pattern;
		// Make pews from pattern
		if (this.pews === null || this.pews.length !== this.pattern.length) {
			var newpews = [];
			for (var ptp = 0, ptpLen=pattern.length; ptp < ptpLen; ptp++) {
				newpews.push(Pew.create({x:30, y: 20 + ptp*40, seats: pattern[ptp][0]}));
			}
			this.set('pews',newpews);
		}
		var pews = this.get('pews');

		// Make saints from pattern
		if (this.saints === null) {
			var newsaints = [];
			for (var p = 0, pLen = pews.length; p < pLen; p++) {
				var pewpattern = pattern[p].slice(1), 
					pew = pews[p];
				for (var s = 0, sLen = pewpattern.length; s < sLen; s++) {
					var coords = pew.getSaintPosition(pewpattern[s]);
					newsaints.push(Saint.create({x: coords.x, y: coords.y, pew: pew, seat: pewpattern[s]}));
				}
			}
			this.set('saints',newsaints);
		}
	},
	/**
	* Reset the "fed" state of all the saints in the layout
	* @method resetFed
	*/
	resetFed: function() {
		for (var s = 0, sLen = this.saints.length; s < sLen; s++) {
			this.saints[s].set('fed', false);
		}
	}

});