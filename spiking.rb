## splits sixwordstory && showerthoughts
sent.downcase.split(/\W+/)



## searching database to see if a dream contains words from the grand word_arr (six word plus shower thoughts)

####### for more complex results, count how many words are matching
# and later only output the dreams with the most matching words.
# [45] Pry(main)> www = word_arr.map do |word|
# [45] Pry(main)*   dream.downcase.strip.include? word  
# [45] Pry(main)* end  
# [
#     [0] false,
#     [1] false,
#     [2] false,
#     [3] false,
#     [4] false,
#     [5] false,
#     [6] true

#for those that are true, push them and the # of most matching words into an array … er maybe a hash if I’m going to mix in the number of correct words.
 # dream_arr << dream with matching words
# ….. just an array for now.

## pluck a random dream from the array (or the one with the most words)
## 




#### SCRAPING


 require 'nokogiri'

dream_page = HTTParty.get('http://www.dreambank.net/random_sample.cgi?series=b&min=25&max=300&n=2500')

dream_page_rdom = Nokogiri::HTML(dream_page)

dream_page_span = dream_page_rdom.css('span')

dream_arr = dream_page_span.map do |dream|
dream.text
end

dream_arr


# regex  
# end of line -   ([^.]*)$
# front of line -  \A([^)]*).
# front of line special case -  /\A([^]]*)./


aaa = []
dream_arr.each do |dream|
 dreaming = dream.gsub(/([^.]*)$/, "").gsub(/\A([^)]*)./, "").gsub("\"", "'")
 if dreaming.include?("[")
   dreaming.gsub!(/\A([^\]]*)./, "")
 end
 aaa << dreaming
end



#### STORING IN FILE

# [57] Pry(main)> File.open(“dreams.txt", "w+") do |f|
# [57] Pry(main)*   aaa.each{|dream| f.puts(dream)}  
# [57] Pry(main)* end  

# ### APPENDING to that file

# [62] Pry(main)> File.open("dreams.txt", "a+") do |f|
# [62] Pry(main)*   f.puts("testestestst")
# [62] Pry(main)* end  












### algorithm 

stories = Story.all
thoughts = Thought.all
dreams = Dream.all

s = stories.first.title
t = thoughts.first.title

sarr = s.downcase.split(/\W+/)
tarr = t.downcase.split(/\W+/)



 @words_to_reject = ['this', 'isn', 'that', 'these', 'the', 'would', 
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

def find_story
	story = Story.all.sample.title
end

def story_to_array(story_string)
  word_array = story_string.downcase.split(/\W+/)
  word_array.select!{|word| word if word.length > 2}
  word_array.reject!{|word| word if @words_to_reject.include? word}
  return word_array.uniq
end

def match_story_to_thought(story_array)
  thought_and_word_matches = {}
  Thought.all.each do |thought|
    @match_words = []
    counter = 0
    arr_search = story_array.each do |word|
      if (thought.title.downcase.include? word) && (word.length > 2)
        counter += 1
        @match_words << word
      end
    end
    if counter > 0
      thought_and_word_matches[thought.title] = [counter, @match_words]
    end
  end
  if thought_and_word_matches == {}
    failsafe = Thought.all.sample.title
    thought_and_word_matches[failsafe] = 1
  end
  return thought_and_word_matches.sort_by{ |thought, word_count| word_count}.reverse.first(3)
end

def create_word_array(story_string, thought_string)
  story_array = story_string.downcase.split(/\W+/)
  thought_array = thought_string.downcase.split(/\W+/)
  arr = story_array + thought_array
  arr.uniq!
  arr.select!{|word| word if word.length > 2}
  arr.reject!{|word| word if @words_to_reject.include? word}
  return arr
end

def search_matches(word_array)
  dream_and_word_matches = {}
  Dream.all.each do |dream|
    @match_words = []
    counter = 0
    arr_search = word_array.each do |word|
      if (dream.dream.downcase.include? word) && (word.length > 2)
        counter += 1
        @match_words << word
      end
    end
    if counter >= 2
     dream_and_word_matches[dream.dream] = [counter, @match_words]
    end
  end
  return dream_and_word_matches.sort_by{ |dream, word_count| word_count[0]}.reverse.first(3)
end

ss = find_story
sa = story_to_array(ss)
ta = match_story_to_thought(sa)
ts = ta.first[0]
arr = create_word_array(ss, ts)
ds = search_matches(arr)
puts ss
puts ts
ds.first[0]
