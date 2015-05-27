import Ember from 'ember';
import Saint from './saint';
import Pew from './pew';


export default Ember.Object.extend({
	pews: null,
	saints: null,
	pattern: null,
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
	findSaint: function (pew, seat) {
		var saint = this.get('saints').filter(function(elem) {
			return (elem.pew === pew && elem.seat === seat);
		});
		if (saint.length === 0) { 
			return null;
		} else { 
			return saint[0];
		}
	},
	resetFed: function() {
		for (var s = 0, sLen = this.saints.length; s < sLen; s++) {
			this.saints[s].set('fed', false);
		}
	}

});