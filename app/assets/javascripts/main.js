var story = new StoryList();
var storyPainter;

$(function(){
	storyPainter = new StoryListView({
		el: $('.story'),
		collection: story
	})

	story.fetch({reset: true})
})