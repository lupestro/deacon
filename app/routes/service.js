import Ember from 'ember';
import ServiceModel from '../models/service';

export default Ember.Route.extend({
	model: function() {
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
			[7,0,1,5,6],
			[6,"*"],
			[5,2,3,4],
			[4,0,1],
			[3,"*"],
			[2,"*"]
		];
		return ServiceModel.create({ pattern: pattern});
		//return ServiceModel.create();
	}
});
