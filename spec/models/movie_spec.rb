require "rails_helper"

describe Movie, :type => :model do
  context "validations" do
    it "shouldn't create movie with blank title" do
      movie = build(:movie, title: '')
      movie.valid?
      expect(movie.errors[:title]).to include("can't be blank")
    end

    it "shouldn't create movie without description" do
      movie = build(:movie, description: '')
      movie.valid?
      expect(movie.errors[:description]).to include("can't be blank")
    end

    it "shouldn't create movie without user" do
      movie = build(:movie, user: nil)
      movie.valid?
      expect(movie.errors[:user]).to include("can't be blank")
    end

    it "shouldn't create movie without category" do
      movie = build(:movie, category: nil)
      movie.valid?
      expect(movie.errors[:category]).to include("can't be blank")
    end

    it "should create movie with no errors" do
      movie = create(:movie)
      expect(movie.valid?).to eq(true)
    end
  end

  context "ratings relation" do
    it "should destroy dependent ratings when destroyed" do
      movie = create(:movie)
      rating = create(:rating, movie: movie)

      expect(Rating.count).to eq(1)

      movie.destroy

      expect(Rating.count).to eq(0)
    end

    it "should update average_rating on new ratings" do
      movie = create(:movie)

      # check for default average_rating value
      expect(movie.average_rating).to eq(0.0)

      rating = create(:rating, movie: movie, rate: 3)

      expect(movie.reload.average_rating).to eq(3.0)
    end

    it "should update average_rating on new ratings" do
      movie = create(:movie)

      # check for default average_rating value
      expect(movie.average_rating).to eq(0.0)

      rating = create(:rating, movie: movie, rate: 3)

      expect(movie.reload.average_rating).to eq(3.0)
    end

    it "should update average_rating on updated ratings" do
      movie = create(:movie)
      # check for default average_rating value
      expect(movie.average_rating).to eq(0.0)
      rating = create(:rating, movie: movie, rate: 3)
      # check average_rating after rating creation
      expect(movie.reload.average_rating).to eq(3.0)
      rating.update(rate: 5)
      # check average_rating after rating update
      expect(movie.reload.average_rating).to eq(5.0)
    end

    it "should have average rating for more than one rating" do
      movie = create(:movie)
      create(:rating, movie: movie.reload, rate: 1)
      create(:rating, movie: movie.reload, rate: 2)
      create(:rating, movie: movie.reload, rate: 3)
      create(:rating, movie: movie.reload, rate: 4)
      # check average_rating after multiple ratings
      expect(movie.reload.average_rating).to eq(2.5)
    end

    it "should have average rating with precision of 1" do
      movie = create(:movie)
      create(:rating, movie: movie.reload, rate: 2)
      create(:rating, movie: movie.reload, rate: 3)
      create(:rating, movie: movie.reload, rate: 3)
      # check the precision of average_rating
      expect(movie.reload.average_rating).to eq(2.7)
    end

    it "by_rating scope should return movies in a given category" do
      movie1 = create(:movie)

      rating1 = create(:rating, movie: movie1, rate: 1)
      rating2 = create(:rating, movie: movie1.reload, rate: 2)

      movie2 = create(:movie)

      rating3 = create(:rating, movie: movie2, rate: 3)
      # check for movies count in different categories
      expect(Movie.by_rating(1).count).to eq(1)
      expect(Movie.by_rating(3).count).to eq(1)
    end
  end

  context "category relation" do
    it "by_category scope should return movies in a given category" do
      category1 = create(:category)
      category2 = create(:category)
      movie1 = create(:movie, category: category1)
      movie2 = create(:movie, category: category1)
      movie3 = create(:movie, category: category2)
      # check for movies count in different categories
      expect(Movie.by_category(category1.id).count).to eq(2)
      expect(Movie.by_category(category2.id).count).to eq(1)
    end
  end
end
