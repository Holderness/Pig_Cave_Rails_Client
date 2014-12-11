var StoryList = Backbone.Collection.extend({
	model: Story,
	url: "http://localhost:3001/stories"
});