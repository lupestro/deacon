import Controller from '@ember/controller';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import ServiceModel from 'deacon/models/service';
/**
* Controller for the service path. This handles all the button clicks and provides the timer loop to drive the dynamics. 
*
* N.B. The controller presents the deacons and saints with situations, but behavior should be left strictly to the implementation of 
* these moral agents. Discovering those effective behaviors is the central point of this whole exercise.
*/
export default class ServiceController extends Controller {
	declare model: ServiceModel;
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
		for (const plate of this.model.plates) {
			let deacon0 = this.model.deacons[0];
			let deacon1 = this.model.deacons[1];
			assert("Both deacons exist", deacon0 && deacon1);
			// Give the deacons opportunity to respond to plates about to finish their journey
			if (plate.direction < 0 && plate.seat === 0) {
				deacon0.plateArriving(plate);
			} else if (plate.direction > 0 && plate.seat === plate.pew.seats - 1) {
				deacon1.plateArriving(plate);				
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
		let firstStage = this.stageNames[0];
		assert("Stages exist", firstStage);
		this.model.stageName = firstStage;
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
		let index = this.stageNames.findIndex( (name) => name === this.model.stageName);
		if (index === this.stageNames.length - 1) {
			this.terminate;
		} else {
			let nextStage = this.stageNames[index + 1];
			if (!nextStage) {
				this.terminate;
			} else {
				this.model.stageName = nextStage;
				this.reset();	
			}
		}
	}
}