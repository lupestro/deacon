import Ember from 'ember';
import Deacon from './deacon';
import Plate from './plate';
import Layout from './layout';

export default Ember.Object.extend({
	stageName: null,
	height: null,
	width: null,
	layout: null,
	deacons: null,
	plates: null,
	pattern: null,
	init: function() {
		if (this.get('stageName') === null) {
			this.set('stageName', "Offertory");
		}
		if (this.get('pattern') === null) {
			this.set('pattern',[ [5,"*"], [5,"*"]]);
		}
		if (this.get('layout') === null) {
			this.set('layout', Layout.create({pattern: this.get('pattern')}));
		}
		var pews = this.get('layout').pews;
		var pew0 =  pews[pews.length-1],
			pew1 = pews[pews.length-2];
		if (this.get('plates') === null) {
			var plates = [];
			plates.push(Plate.create({ seat: -1, pew: pew0}));
			plates.push(Plate.create({ seat: 1000000, pew: pew1}));
			this.set('plates', plates);
		}
		if (this.get('deacons') === null) {
			var deacons = []; 
			deacons.push(Deacon.create({ seat: -1, pew: pew0, plates: [ this.plates[0] ]}));
			deacons.push(Deacon.create({ seat: 1000000, pew: pew1, plates: [ this.plates[1] ]}));
			this.set('deacons', deacons);
		}
		if (this.get('height') === null) {
			this.set('height', this._getInitialHeight());
		}
		if (this.get('width') === null) {
			this.set('width', this._getInitialWidth());
		}
		return this._super();
	},
	_getInitialWidth: function() {
		var pews = this.get('layout').pews, width = 0;
		for (var i = 0, ilen=pews.length; i < ilen; i++) {
			if (width < pews[i].get('width')) {
				width = pews[i].get('width');
			}
		}
		return 60 + width;
	},
	_getInitialHeight: function() {
		var pews = this.get('layout').pews;
		return 40 + pews.length * 40;
	},
	findSaint: function(pew, seat) {
		return this.get('layout').findSaint(pew,seat);
	},
	getPewSeats: function(pew) {
		var pews = this.get('layout').pews;
		if (pew < 0 || pew >= pews.length) {
			return 0;
		} else {
			return pews[pew].get('seats');
		}
	},
	resetPlatesAndDeacons: function() {
		var pews = this.get('layout').pews;
		this.plates[0].reset();
		this.plates[1].reset();
		this.deacons[0].reset ([this.plates[0]], pews[pews.length-1]);
		this.deacons[1].reset ([this.plates[1]], pews[pews.length-2]);
	}
});
