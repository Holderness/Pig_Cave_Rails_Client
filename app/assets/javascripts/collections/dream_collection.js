var DreamList = Backbone.Collection.extend({
	model: Dream,
	url: "http://localhost:3001/dreams"
});