var ThoughtList = Backbone.Collection.extend({
	model: Thought,
	url: "http://localhost:3001/thoughts"
});