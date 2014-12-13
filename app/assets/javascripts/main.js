


var story = new StoryList();
var storyPainter;
var thought = new ThoughtList();
var thoughtPainter;

$(function(){

	// function getParams(){
	// 	return {
	// 		story: $('.story').val(),
	// 		thought: $('.thought').val(),
	// 		dream: $('.dream').val()
	// 	}
	// };

	storyPainter = new StoryListView({
		el: $('.story'),
		collection: story
	});

	// thoughtPainter = new ThoughtListView({
	// 	el: $('.thought'),
	// 	collection: thought
	// });

  thought.fetch({reset: true})
	story.fetch({reset: true}).done(function(){
		$.ajax({
			url: "/",
			type: 'get',
			data: {story: rs},
			success: function(data){
				// thought = $(data).filter('.thought')[0]
				// $('.thought').append(thought)
				dream = $(data).filter('.dream')[0]
				$('.dream').append(dream)
				console.log("Yup");
			}
		})
	}).done(function(){
		$('body').click(function(){
		story.fetch({reset: true}).done(function(){
				$.ajax({
					url: "/",
					type: 'get',
					data: {story: rs},
					success: function(data){
						thought = $.text($(data).filter('.thought')[0])
						$('.thought').text(thought)
						dream = $.text($(data).filter('.dream')[0])
						$('.dream').text(dream)
						console.log("Yup");
					}
				})
			})
		})
	})



});



