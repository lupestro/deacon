import Ember from 'ember';

export default Ember.Controller.extend({
	timer: null,
	stageNames: ['Offertory','Communion: Bread','Communion: Wine'],
	simulate: function() {
		var self=this;
		this.timer = setInterval(function() {
			self.iterate();
		}, 500);
	},
	terminate: function(){
		clearInterval(this.timer);
		this.timer = null;
	},
	reset: function() {
		this.model.resetPlatesAndDeacons();
		this.model.layout.resetFed();
	},
	iterate: function() {
		for (var p = 0, pLen = this.model.plates.length; p < pLen; p++) {
			var plate = this.model.plates[p];
			// Give the deacons opportunity to respond to plates about to finish their journey
			if (plate.direction < 0 && plate.seat === 0) {
				this.model.deacons[0].plateArriving(plate);
			} else if (plate.direction > 0 && plate.seat === plate.pew.seats - 1) {
				this.model.deacons[1].plateArriving(plate);				
			}
			// Give the hand holding the plate an opportunity to do something with it
			var saint = plate.pew.findSaint(plate.seat);
			var deacon = plate.pew.findDeacon(plate.seat);
			if (deacon) {
				deacon.plateInHands(plate, this.model.layout.pews);
			} else if (saint) {
				saint.plateInHands(plate);
			}
		}
	},
	actions: {
		start: function() {
			this.model.set('stageName', this.stageNames[0]);
			this.reset();
			if (!this.timer) {
				this.simulate();
			}
		},
		restart: function() {
			this.reset();
			if (!this.timer) {
				this.simulate();
			}
		},
		next: function() {
			for (var i=0,iLen=this.stageNames.length; i< iLen; i++) {
				if (this.model.get('stageName') === this.stageNames[i]) {
					if (i === iLen - 1) {
						this.terminate();
					} else {
						this.model.set('stageName', this.stageNames[i+1]);
						this.reset();
					}
					break;
				}
			}
		}
	}
});
