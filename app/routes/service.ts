import Route from '@ember/routing/route';
import ServiceModel from '../models/service';
/**
* @module Deacon.Routes
*/

/**
* Route leading to the service controller - initial route in application.
*
* This generates the model using a pattern of the form [ row, row, row, ... ]. Each row is itself an array with one of three forms:
* *	[# seats,"*"] - if you are filling the pew
* * [# seats, 1, 3, 5] - if you are partially seating a pew - first position is 0
* * [# seats] - if you are leaving the pew empty
* 
* @class ServiceRoute
* @extends Ember.Route
*/
export default class ServiceRoute extends Route {
	/**
	* Provide the model to use for the service controller that drives everything.
	* @method model
	* @return {ServiceModel}
	*/
	model(): ServiceModel {
		/*var pattern = [
			[12,"*"],
			[11,"*"],
			[10,"*"],
			[9,"*"],
			[8,"*"],
			[7,0,1,5,6],
			[6,2,3,4,5],
			[5,"*"],
			[4,2,3],
			[4,0,1],
			[3,2],
			[3,0,1]
		];*/
		var pattern = [
			[7, 0, 1, 5, 6],
			[6, "*"],
			[5, 2, 3, 4],
			[4, 0, 1],
			[3, "*"],
			[2, "*"]
		];
		return ServiceModel.create({ pattern: pattern });
	}
}
