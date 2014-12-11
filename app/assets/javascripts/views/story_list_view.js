var StoryListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "reset", this.render)
	},
	render: function(){
		this.$el.empty();
		random_story = _.sample((this.collection.models), 1)[0]
		var view = new StoryView({model: random_story});
		this.$el.append(view.render().$el)
		// var that = this;
		// this.collection.each(function(story){
		// 			debugger
		// 	var view = new StoryView({model: story});
		// 	that.$el.append(view.render().$el);
		// });
		return random_story;
	}
})
