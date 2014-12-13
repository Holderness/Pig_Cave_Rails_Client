module ApplicationHelper

	def thought_api
		@thought_api ||= HTTParty.get("http://localhost:3001/thoughts")
	end

	def dream_api
		@dream_api ||= HTTParty.get("http://localhost:3001/dreams")
	end

	def words_to_reject
	 words_to_reject = ['this', 'isn', 'that', 'these', 'the', 'would', 
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
end

# def find_story
# 	story = Story.all.sample.title
# end

def story_to_array(story_string)
  word_array = story_string.downcase.split(/\W+/)
  word_array.select!{|word| word if word.length > 2}
  word_array.reject!{|word| word if words_to_reject.include? word}
  return word_array.uniq
end

def match_story_to_thought(story_array, thought_api)
  thought_and_word_matches = {}
  thought_api.each do |thought|
    @match_words = []
    counter = 0
    arr_search = story_array.each do |word|
      if (thought["title"].downcase.include? word) && (word.length > 2)
        counter += 1
        @match_words << word
      end
    end
    if counter > 0
      thought_and_word_matches[thought["title"]] = [counter, @match_words]
    end
  end
  if thought_and_word_matches == {}
    failsafe = thought_api.sample.title
    thought_and_word_matches[failsafe] = 1
  end
  return thought_and_word_matches.sort_by{ |thought, word_count| word_count}.reverse.first(3).sample.first
end

def create_word_array(story_string, thought_string)
  story_array = story_string.downcase.split(/\W+/)
  thought_array = thought_string.downcase.split(/\W+/)
  arr = story_array + thought_array
  arr.uniq!
  arr.select!{|word| word if word.length > 2}
  arr.reject!{|word| word if words_to_reject.include? word}
  return arr
end

def search_matches(word_array, dream_api)
  dream_and_word_matches = {}
  dream_api.each do |dream|
    @match_words = []
    counter = 0
    arr_search = word_array.each do |word|
      if (dream["dream"].downcase.include? word) && (word.length > 2)
        counter += 1
        @match_words << word
      end
    end
    if counter >= 2
     dream_and_word_matches[dream["dream"]] = [counter, @match_words]
    end
  end
  return dream_and_word_matches.sort_by{ |dream, word_count| word_count[0]}.reverse.first(3).sample.first
end

end
