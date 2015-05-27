import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'g',
	classNames: ['plate'],
	attributeBindings: ['transform'],
	transform: Ember.computed('x','y', function() {
			return "translate(" + this.x + "," + this.y + ")";
	})
});
