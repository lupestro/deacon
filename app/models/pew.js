import Ember from 'ember';

export default Ember.Object.extend({
	x: null,
	y: null,
	width: null,
	seats: null,
	saints: null,
	deacons: null,
	plates: null,
	init: function() {
		if (this.x === null) {
			this.x = 0;
		}
		if (this.y === null) {
			this.y = 0;
		}
		if (this.saints === null) {
			this.saints = [];
		}
		if (this.deacons === null) {
			this.deacons = [];
		}
		if (this.plates === null) {
			this.plates = [];
		}
		if (this.seats === null && this.width !== null) {
			this.seats = (this.width - 20) / 30;
		} else if (this.width === null && this.seats !== null) {
			this.width = 20 + this.seats * 30;
		} else if (this.width === null && this.seats === null) {
			this.width=200; 
			this.seats = 6;
		} 
		if (this.width === null) {
			this.width = 200;
		}
		this.set('height', 32);
		return this._super();
	},
	getSaintPosition: function(seat) {
		var realSeat = seat;
		if (seat > this.seats) {
			realSeat = this.seats-1;
		} else if (seat < 0) {
			realSeat = 0;
		}
		var offset = 10 + realSeat * 30;
		return {x: this.x + offset, y: this.y, seat: realSeat};
	},
	getDeaconPosition: function(seat) {
		var result = {x: 0, y: this.y };
		if (seat < 0) {
			result.x = this.x - 30;
		} else if (seat >= this.seats) {
			result.x = this.x + this.width - 10;
		} else {
			result.x = this.x + 10 + seat * 30;
		}
		return result;
	},
	getPlatePosition: function(seat) {
		var result = {x: 0, y: this.y + 5};
		if (seat < 0) {
			result.x = this.x - 10;
		} else if (seat >= this.seats) {
			result.x = this.x + this.width-10;
		} else {
			result.x = this.x + 15 + seat * 30;
		}
		return result;
	},
	getDeaconSeat: function(deacon) {
		if (deacon.seat < 0) {
			return deacon.seat;
		} else {
			return this.seats;
		}
	},
	addSaint: function(saint) {
		if (-1 === this.saints.indexOf(saint)) {
			this.saints.push(saint);
		}
	},
	removeSaint: function(saint) {
		var index = this.saints.indexOf(saint);
		if (index >= 0) {
			this.saints.splice(index,index+1);
		}
	},
	findSaint: function(seat) {
		var saint = this.saints.filter(function(elem) {
			return (elem.seat === seat);
		});
		if (saint.length === 0) { 
			return null;
		} else { 
			return saint[0];
		}
	},
	allAreFed: function() {
		var unfed = this.saints.filter(function(elem) {
			return (elem.fed === false);
		});
		return unfed.length === 0;
	},
	addDeacon: function(deacon) {
		if (-1 === this.deacons.indexOf(deacon)) {
			this.deacons.push(deacon);
		}
	},
	removeDeacon: function(deacon) {
		var index = this.deacons.indexOf(deacon);
		if (index >= 0) {
			this.deacons.splice(index,index+1);
		}		
	},
	findDeacon: function(seat) {
		var deacon = this.deacons.filter(function(elem) {
			return (elem.seat === seat);
		});
		if (deacon.length === 0) { 
			return null;
		} else { 
			return deacon[0];
		}
	},
	addPlate: function (plate) {
		if (-1 === this.plates.indexOf(plate)) {
			this.plates.push(plate);
		}		
	},
	removePlate: function(plate) {
		var index = this.plates.indexOf(plate);
		if (index >= 0) {
			this.plates.splice(index,index+1);
		}		
	},
	hasPlateInMotion: function () {
		for (var p = 0, pLen = this.plates.length; p < pLen; p++) {
			if (this.plates[p].direction !== 0 && (this.plates[p].seat >= 0 || this.plates[p].seat < this.seats)) {
				return true;
			}
		}
		return false;
	}
});
