import Controller from '@ember/controller';
import { action } from '@ember/object';
/**
* Controller for the service path. This handles all the button clicks and provides the timer loop to drive the dynamics. 
*
* N.B. The controller presents the deacons and saints with situations, but behavior should be left strictly to the implementation of 
* these moral agents. Discovering those effective behaviors is the central point of this whole exercise.
*/
export default class ServiceController extends Controller {
	/**
	* The interval timer that drives the animation
	*/
	timer? : number;
	/**
	* The names of the three cycles of deacons going up the rows
	*/
	stageNames = ['Offertory','Communion: Bread','Communion: Wine'];
	/**
	* Simulate the behavior of deacons - starting a timer to drive the simulation
	* @method simulate
	*/
	simulate() {
		var self = this;
		this.timer = window.setInterval(function() {
			self._iterate();
		}, 500);
	}
	/**
	* Stop the simulation 
	* @method ţerminate
	*/
	terminate(){
		clearInterval(this.timer);
		this.timer = undefined;
	}
	/**
	* Reset the state of the simulation. This doesn't affect whether it continues. 
	* Resetting while the simulation is running may have unintended consequences, since no protections are in place.
	* @method reset
	*/
	reset() {
		this.model.resetPlatesAndDeacons();
		this.model.layout.resetFed();
	}
	/**
	* Perform one cycle of the simulation. Called by the interval timer. Currently doesn't detect completion and act on it.
	* @method _iterate
	*/
	_iterate() {
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
	}
	/**
	* <i>Action:</i> Start button click. Set the simulation to the first stage, resets the simulation, and if it isn't already running, it starts it.
	* @method start
	*/
	@action start() {
		this.model.stageName = this.stageNames[0];
		this.reset();
		if (!this.timer) {
			this.simulate();
		}
	}
	/**
	* <i>Action:</i> Restart button click. Reset the simulation in the current stage, and if it isn't already running, it starts it.
	* @method restart
	*/
	@action restart() {
		this.reset();
		if (!this.timer) {
			this.simulate();
		}
	}
	/**
	* <i>Action:</i> Next button click. Move on to the next stage and continues the simulation. Stops the simulation if it is in the last stage.
	* @method next
	*/
	@action next() {
		for (var i=0,iLen=this.stageNames.length; i< iLen; i++) {
			if (this.model.stageName === this.stageNames[i]) {
				if (i === iLen - 1) {
					this.terminate();
				} else {
					this.model.stageName = this.stageNames[i+1];
					this.reset();
				}
				break;
			}
		}
	}
}