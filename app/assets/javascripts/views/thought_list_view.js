var ThoughtListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "reset", this.render);
	},
	render: function(){
		this.$el.empty();
	}
});