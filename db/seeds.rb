puts "Clearing all DB Entries"
Category.delete_all
User.delete_all
Movie.delete_all
Rating.delete_all

puts "Seeding DB with some test records"

# Users
user1 = User.new
user1.email = 'userone@gmail.com'
user1.nickname = 'User1'
user1.password = 'rmdbisthebest'
user1.password_confirmation = 'rmdbisthebest'
user1.save!

user2 = User.new
user2.email = 'usertwo@gmail.com'
user2.nickname = 'User2'
user2.password = 'imsuchacooluser'
user2.password_confirmation = 'imsuchacooluser'
user2.save!

puts "Created 2 test users"

# Categories
category1 = Category.new
category1.title = "Drama"
category1.save

category2 = Category.new
category2.title = "Comedy"
category2.save!

puts "Created 2 test categories"

# Movies
movies = []
for i in 1..40
  movie = Movie.new
  movie.title = "Movie number #{i}"
  movie.description = "Description for movie number #{i}"
  movie.user = i.even? ? user1 : user2
  movie.category = i.even? ? category1 : category2
  movie.save!
  movies << movie
end

puts "Created 40 test movies"

# Ratings
# Just rate some of the movies, leave the rest for testing 
movies[0..19].each_with_index do |movie, i|
  rating = Rating.new
  rating.user = i.even? ? user2 : user1
  rating.movie = movie
  rating.rate = rand(1..5)
  rating.save!
end

puts "Added ratings to 10 movies"
puts "Seeding done"
