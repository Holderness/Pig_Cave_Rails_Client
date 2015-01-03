	 

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
  'something', 'tell', 'told', 'each', 'came', 'went'];


  // var storiesArray = _.map(story.models, function(s){
  //   return s.attributes.title;
  // });
  // var dreamsArray = _.map(dreams.models, function(d){
  //   return d.attributes.dream;
  // });
  // var thoughtsArray = _.map(thoughts.models, function(t){
  //   return t.attributes.title;
  // });


  var stringToArray = function stringToArray(string){
    var wordArray = string.toLowerCase().split(/\W+/);
    var wordArrayFiltered = _.filter(wordArray, function(word) {
      return (word.length > 2);
    });
    var wordArrayFilteredAgain = _.reject(wordArrayFiltered, function(word){
      return _.find(wordsToReject, function(rejectWord){
        return word === rejectWord;
      });
    });
    return _.uniq(wordArrayFilteredAgain);
  };


  var matchStoryToThought = function matchStoryToThoughts(storyArray, thoughtsArray){
    var thoughtAndWordMatches = [];
    _.each(thoughtsArray, function(thought){
        var counter = 0;
        var thoughtLowerCase = thought.toLowerCase();
        _.each(storyArray, function(word){
           if ((thoughtLowerCase.search(word) > 0) && (word.length > 2)) {
             counter++;
           }
        });
        if (counter > 0){
          thoughtAndWordMatches.push([thought, counter]);
        }
      });
      orderedByWordMatchNumber = _.pairs(thoughtAndWordMatches.sort(function(a,b){
       return b[1]-a[1];
      }));
      return orderedByWordMatchNumber[0][1][0];
    };

// // two different ways to get orderedByWordMatchNumber
// _.pairs(matchStoryToThoughts(sa, ta)).sort(function(a,b){ return b[1]-a[1]})
// _.sortBy(_.pairs(matchStoryToThoughts(sa, ta)), function(pair){ return pair[1] }).reverse()


var createWordArray = function createWordArray(storyArray, thoughtArray){
  return _.uniq(storyArray.concat(thoughtArray));
};

// var dreamsArray = _.map(dreams.models, function(dreamModel){
//   return dreamModel.attributes.dream;
// });

// var thoughtsArray = _.map(thoughts.models, function(thoughtModel){
//   return thoughtModel.attributes.title;
// });


// var matchDreamToWordArray = function MatchDreamToWordArray(wordArray, dreamArray){
//   var dreamAndWordMatches = [];

// }


// ss = "hey doggy where are you I don't know nice doggy fancy doggy love camp"
// sa = stringToArray(ss)
// ta = ["this is a thought I am a thought doggy love camp", "wheres the party at? nice nice know I don't you", "fat daddy you're a fat daddy", "doggy fancy love camp hey nice pretty", "no words in here", "comparison for hey doggy where nice doggy fancy lady doggy love doggy"]
// matchStoryToThought(sa, ta)
    

