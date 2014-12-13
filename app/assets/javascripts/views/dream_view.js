var DreamView = Backbone.View.extend({
	tagName:'div',
	render: function(){
		this.$el.html(this.model.get('dream'))
		return this;
	}
})