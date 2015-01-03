

var story = new StoryList();
var storyPainter;
var thoughts = new ThoughtList();
var thoughtsPainter;
var dreams = new DreamList();
var dreamsPainter;


$(function(){

	// function getParams(){
	//	return {
	//		story: $('.story').val(),
	//    thought: $('.thought').val(),
	//		dream: $('.dream').val()
	//	}
	// };

	storyPainter = new StoryListView({
		el: $('.story'),
		collection: story
	});

	// thoughtPainter = new ThoughtListView({
	//	el: $('.thought'),
	//	collection: thought
	// });
  dreams.fetch({reset: true}).done(function(){
   dreamsArray = _.map(dreams.models, function(d){
    return d.attributes.dream;
    });
  });
  thoughts.fetch({reset: true}).done(function(){
   thoughtsArray = _.map(thoughts.models, function(t){
    return t.attributes.title;
   });
  });
  story.fetch({reset: true}).done(function(){
    $.ajax({
      url: "/",
      type: 'get',
      data: {story: rs},
      success: function(data){
        // thought = $.text($(data).find('.thought')[0]);
        // $('.thought').text(thought);
        // dream = $.text($(data).find('.dream')[0]);
        // $('.dream').text(dream);
        // var dreamsArray = _.map(dreams.models, function(dreamModel){
        //   return dreamModel.attributes.dream;
        // });
        // var thoughtsArray = _.map(thoughts.models, function(thoughtModel){
        //   return thoughtModel.attributes.title;
        // });
        randomStoryArray = stringToArray(rs);
        thoughtt = matchStoryToThought(randomStoryArray, thoughtsArray);
        thoughttArray = stringToArray(thoughtt);
        dreamm = matchStoryToThought(thoughttArray, dreamsArray);
        $(".thought").text(thoughtt);
        $(".dream").text(dreamm);
        console.log("Yup");
      }
    });
  })
.done(function(){
	$('body').click(function(){
		story.fetch({reset: true}).done(function(){
			$.ajax({
				url: "/",
				type: 'get',
				data: {story: rs},
				success: function(data){
					// thought = $.text($(data).find('.thought')[0]);
					// $('.thought').text(thought);
					// dream = $.text($(data).find('.dream')[0]);
					// $('.dream').text(dream);
          randomStoryArray = stringToArray(rs);
          thoughtt = matchStoryToThought(randomStoryArray, thoughtsArray);
          thoughttArray = stringToArray(thoughtt);
          dreamm = matchStoryToThought(thoughttArray, dreamsArray);
					$(".thought").text(thoughtt);
          $(".dream").text(dreamm);
					console.log("clickity-click");
				}
			});
		});
	});
});



$(document).scroll(function(){
  if(document.documentElement.clientHeight +
    $(document).scrollTop() >= document.body.offsetHeight ){
    $(document).scrollTop(0);
	story.fetch({reset: true}).done(function(){
		$.ajax({
			url: "/",
			type: 'get',
			data: {story: rs},
			success: function(data){
				thought = $.text($(data).find('.thought')[0]);
				$('.thought').text(thought);
				dream = $.text($(data).find('.dream')[0]);
				$('.dream').text(dream);
				console.log("8P");
			}
		});
	});
}
});

  
  var size = [window.width,window.height];
  
  $(window).resize(function(){
    window.resizeTo(size[0],size[1]);
  });

});