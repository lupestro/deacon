import Ember from 'ember';

export default Ember.Object.extend({
	x: null,
	y: null,
	pew: null,
	seat: null,
	direction: null, // -1 toward left, 0 not moving, +1 toward right
	init: function() {
		if (this.direction === null) {
			this.direction = 0;
		}
		if (this.seat !== null && this.pew !== null) {
			if (this.seat > this.pew.get('seats')) {
				this.seat = this.pew.get('seats');
			} else if (this.seat < -1) {
				this.seat = -1;
			}
		}
		if (this.x === null || this.y === null) {
			this.move(this.pew, this.seat);
		}
		return this._super();
	},
	reset: function() {
		this.direction = 0;
	},
	move: function(pew, seat) {
		var movingPews = (this.pew !== pew);
		if (movingPews && this.pew) {
			this.pew.removePlate(this);
		}
		var coord = pew.getPlatePosition(seat);
		this.set('x',coord.x);
		this.set('y',coord.y);
		this.set('pew', pew);
		this.set('seat', seat);
		if (movingPews && this.pew) {			
			this.pew.addPlate(this);
		}
	}
});