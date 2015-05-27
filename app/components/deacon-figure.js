import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'g',
	classNames: ['deacon'],
	attributeBindings: ['transform'],
	transform: Ember.computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ") rotate(90,16,16)";
	})
});
