import Ember from 'ember';
import ServiceModel from '../models/service';

export default Ember.Route.extend({
	model: function() {
		return ServiceModel.create({ pattern:[ [7,0,1,5,6],[6,"*"],[5,2,3,4],[4,0,1],[3,"*"], [2,"*"] ]});
		//return ServiceModel.create();
	}
});
