

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
						thought = $.text($(data).find('.thought')[0])
						$('.thought').text(thought)
						dream = $.text($(data).find('.dream')[0])
						$('.dream').text(dream)
				console.log("Yup");
			}
		})
	})
	.done(function(){
		$('body').click(function(){
		story.fetch({reset: true}).done(function(){
				$.ajax({
					url: "/",
					type: 'get',
					data: {story: rs},
					success: function(data){
						thought = $.text($(data).find('.thought')[0])
						$('.thought').text(thought)
						dream = $.text($(data).find('.dream')[0])
						$('.dream').text(dream)
						console.log("clickity-click");
					}
				})
			})
		})
	})

  $(document).scroll(function(){
    if(document.documentElement.clientHeight + 
    	$(document).scrollTop() >= document.body.offsetHeight ){
    	$(document).scrollTop(0)
	    story.fetch({reset: true}).done(function(){
		    $.ajax({
			    url: "/",
			    type: 'get',
		  	  data: {story: rs},
		  	  success: function(data){
				  	thought = $.text($(data).find('.thought')[0])
				  	$('.thought').text(thought)
				  	dream = $.text($(data).find('.dream')[0])
				  	$('.dream').text(dream)
				  console.log("8P");
			    }
		    })
	    })
    };
  });

});



