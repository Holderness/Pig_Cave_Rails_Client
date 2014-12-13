	 

   wordsToReject = ['this', 'isn', 'that', 'these', 'the', 'would', 
  'wouldn', 'and', 'have', 'having', 'had', 'has', 'haven', 'with', 
  'from', 'what', 'where', 'can', 'but', 'get', 'got', 'getting', 
  'for', 'then', 'there', 'our', 'all', 'when', 'will', 'ever', 
  'every', 'are', 'aren', 'along', 'into', 'just', 'were', 'was', 
  'not', 'say', 'about', 'after', 'across', 'above', 'out', 'well', 
  'one', 'didn', 'before', 'behind', 'while', 'how', 'few', 'many', 
  'much', 'see', 'look', 'like', 'able', 'off', 'should', 'shouldn', 
  'could', 'couldn', 'only', 'why', 'said', 'most', 'more', 'his', 
  'her', 'him', 'she', 'they', 'them', 'their', 'here', 'there', 
  'because', 'who', 'back', 'doing', 'don', 'good', 'around', 'wont', 
  'else', 'too', 'now', 'been', 'some', 'become', 'wasn', 'use', 
  'did', 'know', 'through', 'though', 'than', 'then', 'its', 'right', 
  'left', 'took', 'take', 'does', 'doesn', 'make', 'made', 'within', 
  'even', 'anything', 'knew', 'thought', 'own', 'really', 'want', 
  'something', 'tell', 'told', 'each', 'came', 'went']

  var stringToArray = function stringToArray(string){
    var wordArray = string.toLowerCase().split(/\W+/);
    var wordArray = _.filter(wordArray, function(word){
      return (word.length > 2);
    });
    var wordArray = _.reject(wordArray, function(word){
      return _.find(wordsToReject, function(rejectWord){
        return word === rejectWord;
      });
    });
    return wordArray = _.uniq(wordArray);
  };




  var matchStoryToThought = function matchStoryToThought(storyArray, thoughtApi){
    thoughtAndWordMatches = {}
    var counter = 0
    _.each(thoughtApi, function(thought){
      debugger
      if (_.contains(storyArray, thought)){
        counter +=1

      }
      // _.each(storyArray, function(word){
      //   debugger
      //   if (thought.attributes.title.toLowerCase().contains(word) && (word.length > 2)){
      //     counter += 1
      //   }
      // })
    })
  };

  story_arr = story.models
  sa = storyToArray("Together, they found time was irrelevant.")
  aaa = "Together they all went out and played. Found mud"
  bbb = storyToArray(aaa)
  ta = matchStoryToThought(sa, bbb)


//   def match_story_to_thought(story_array, thought_api)
//   thought_and_word_matches = {}
//   thought_api.each do |thought|
//     @match_words = []
//     counter = 0
//     arr_search = story_array.each do |word|
//       if (thought["title"].downcase.include? word) && (word.length > 2)
//         counter += 1
//         @match_words << word
//       end
//     end
//     if counter > 0
//       thought_and_word_matches[thought["title"]] = [counter, @match_words]
//     end
//   end
//   if thought_and_word_matches == {}
//     failsafe = thought_api.sample.title
//     thought_and_word_matches[failsafe] = 1
//   end
//   return thought_and_word_matches.sort_by{ |thought, word_count| word_count}.reverse.first(3).sample.first
// end



