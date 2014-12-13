var ThoughtListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "reset", this.render)
	},
	render: function(){
		this.$el.empty();
		// randomStory = _.sample((this.collection.models), 1)[0]
		// rs = randomStory.attributes.title
		// var view = new StoryView({model: randomStory});
		// this.$el.append(view.render().$el)
		// var that = this;
		// this.collection.each(function(story){
		// 			debugger
		// 	var view = new StoryView({model: story});
		// 	that.$el.append(view.render().$el);
		// });
		// return randomStory;
	}
})