import Ember from 'ember';

export default Ember.Object.extend({
	x: null,
	y: null,
	pew: null,
	seat: null,
	fed: null,
	init: function() {
		if (this.x === null) {
			this.x = 0;
		}
		if (this.y === null) {
			this.y = 0;
		}
		if (this.fed === null) {
			this.fed = false;
		}
		if (this.seat !== null && this.pew !== null) {
			if (this.seat > this.pew.get('seats')) {
				this.seat = this.pew.get('seats');
			} else if (this.seat < -1) {
				this.seat = -1;
			}
		}
		if (this.pew !== null) {
			this.pew.addSaint(this);
		}

		return this._super();
	},
	plateInHands: function (plate) {
		var neighbor;
		if (this.seat === 0 && plate.direction < 0) {
			neighbor = this.pew.findDeacon(-1);
		} else if (this.seat === this.pew.seats-1 && plate.direction > 0) {
			neighbor = this.pew.findDeacon(this.pew.seats);
		} else {
			neighbor = this.pew.findSaint(this.seat + plate.direction);
			if (!neighbor) {
				plate.direction = -plate.direction;
				neighbor = this.pew.findSaint(this.seat + plate.direction);
			}
		}
		if (neighbor) {
			this.passPlate(plate, neighbor);
		}
	},
	sit: function(pew, seat) {
		var realseat;
		if (seat > this.pew.get('seats')) {
			realseat = this.pew.get('seats');
		} else if (seat < -1) {
			realseat = -1;
		} else {
			realseat = seat;
		}
		if (this.pew !== null) {
			this.pew.removeSaint(this);
		}
		this.set('pew', pew);
		this.set('seat', realseat);
		var coords = pew.getSaintPosition(realseat);
		this.set('x', coords.x);
		this.set('y', coords.y);
		this.pew.addSaint(this);
	},
	passPlate: function(plate, neighbor){
		if (neighbor) {
			if (!neighbor.receivePlate(plate, this)) {
				plate.direction = 0;
			}
		} else {
			// if we aren't falling off the end of a row, reverse direction
			if (! ((this.seat === 0 && plate.direction === -1) || 
				   (this.seat === this.pew.seats && plate.direction === 1))) { 
				plate.direction = - plate.direction;
			}
		}
	},
	receivePlate: function(plate, from) {
		plate.move(this.pew, this.seat);
		if (from.seat < this.seat) {
			plate.direction = 1;
		} else if (from.seat > this.seat) {
			plate.direction = -1;
		}
		this.fed = true;
		return true;
	}
});
