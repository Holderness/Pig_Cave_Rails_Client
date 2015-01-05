var ThoughtView = Backbone.View.extend({
	tagName:'div',
	render: function(){
		this.$el.html(this.model.get('title'));
		return this;
	}
});