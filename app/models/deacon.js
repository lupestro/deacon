import Ember from 'ember';

export default Ember.Object.extend({
	x: null,
	y: null,
	pew: null,
	seat: null,
	plates: null,
	_passed: null,
	init: function() {
		if (this.seat !== null && this.pew !== null) {
			if (this.seat > this.pew.get('seats')) {
				this.seat = this.pew.get('seats');
			} else if (this.seat < -1) {
				this.seat = -1;
			}
		}
		if (this.plates !== null) {
			this._passed = [];
			for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
				this._passed.push(false);
			}
		}
		if (this.x === null || this.y === null) {
			this.move(this.pew, this.seat);
		}		
		return this._super();
	},
	reset: function (plates, pew) {
		this.set('plates', plates);
		this._passed = [];
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			this._passed.push(false);
		}
		this.move(pew);
	},
	plateArriving: function (plate) {
		if (plate.pew !== this.pew) {
			this.move(plate.pew);			
		}
	},
	plateInHands: function (plate, pews) {
		if (plate.pew.allAreFed()) { // Time to move on to another pew
			var p = pews.indexOf(plate.pew);
			while (--p >= 0) {
				if (!pews[p].allAreFed()) {
					this.move(pews[p]);
					break;
				}
			}
		} else if (!plate.pew.hasPlateInMotion() && this.plates.indexOf(plate) >= 0) {
			var somethingPassed = false;
			for (var m = 0, mLen = this.plates.length; m < mLen; m++) {
				if (this._passed[m]) {
					somethingPassed = true;
				}
			}
			if (!somethingPassed) {
				if (this.seat < 0) {
					plate.direction = 1;
				} else {
					plate.direction = -1;
				}
				var saint = plate.pew.findSaint(plate.seat + plate.direction);
				if (saint) {
					this.passPlate(plate, saint);
				} else {
					plate.direction = 0;
				}
			}
		}
	},
	move: function(pew){
		if (this.pew !== null) {		
			this.pew.removeDeacon(this);
		}
		this.set('pew',pew);
		this.set('seat', pew.getDeaconSeat(this));
		var coords = pew.getDeaconPosition(this.seat);
		this.set('x',coords.x);
		this.set('y',coords.y);
		this.pew.addDeacon(this);
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			this.plates[p].move(pew, this.seat);
			this._passed[p] = false;
		}
	}, 
	passPlate: function(plate, neighbor){
		var idx = -1;
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			if (plate === this.plates[p]) {
				idx = p;
				break;
			}
		}
		if (idx >= 0 && !this._passed[idx]) {
			if (neighbor) {
				if (this.seat < 0) {
					plate.direction = 1;
				} else {
					plate.direction = -1;
				}
				if (neighbor.receivePlate(plate)) {
					var index = this.plates.indexOf(plate);
					if (index >= 0) {
						this.plates.splice(index,index+1);
						this._passed.splice(index,index+1);
					}
				}
			}
		}
	},
	receivePlate: function(plate) {
		plate.move(this.pew, this.seat);
		plate.direction = 0;
		this.plates.push(plate);
		this._passed.push(true);		
		return true;
	}
});
