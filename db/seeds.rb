require 'literate_randomizer'

puts "Clearing all DB Entries"
Category.delete_all
User.delete_all
Movie.delete_all
Rating.delete_all

puts "Seeding DB with some test records"

# Users
names = %w(menisy rick jane morty peter)
users = []

names.each do |name|
  user = User.new(nickname: name.titleize)
  user.email = "#{name}@test.com"
  user.password, user.password_confirmation = ["123456"]*2
  user.save
  users << user
end

puts "Created #{users.length} test users"


# Categories
titles = %w(Drama Comedy Action Horror)
categories = []
titles.each do |title|
  categories << Category.create(title: title)
end

puts "Created #{categories.length} test categories"

# Movies
movies = []
for i in 1..40
  movie = Movie.new
  movie.title = LiterateRandomizer.sentence(words: 3, punctuation: '')
  movie.description = LiterateRandomizer.paragraph(sentences: 5)
  movie.user = users.sample
  movie.category = categories.sample
  movie.save
  movies << movie
end

puts "Created #{movies.length} test movies"

# Ratings
# Just rate some of the movies, leave the rest for testing
for i in (0...(movies.length / 2))
  rating = Rating.new
  rating.user = users.sample
  rating.movie = movies.sample
  rating.rate = rand(1..5)
  rating.save
end

puts "Added some ratings"
puts "Seeding done"
