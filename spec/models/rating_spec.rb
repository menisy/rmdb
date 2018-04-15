require "rails_helper"

describe Rating, :type => :model do
  context "validations" do

    it "shouldn't create rating with blank movie" do
      rating = build(:rating, movie: nil)
      rating.valid?
      expect(rating.errors[:movie]).to include("can't be blank")
    end

    it "shouldn't create rating with blank user" do
      rating = build(:rating, user: nil)
      rating.valid?
      expect(rating.errors[:user]).to include("can't be blank")
    end

    it "shouldn't create rating with blank rate" do
      rating = build(:rating, rate: nil)
      rating.valid?
      expect(rating.errors[:rate]).to include("can't be blank")
    end

    it "shouldn't create rating rating less than 1" do
      rating = build(:rating, rate: 0)
      rating.valid?
      expect(rating.errors[:rate]).to include("Rating should be between 1 and 5")
    end

    it "shouldn't create rating rating greater than 5" do
      rating = build(:rating, rate: 6)
      rating.valid?
      expect(rating.errors[:rate]).to include("Rating should be between 1 and 5")
    end

    it "shouldn't create 2 ratings for same movie and user" do
      user = create(:user)
      movie = create(:movie)
      rating = create(:rating, user: user, movie: movie)
      rating2 = build(:rating, user: user, movie: movie)
      rating2.valid?
      expect(rating2.errors[:user_id]).to include("You've already added a rating for this movie")
    end

    it "should create rating with no error" do
      rating = create(:rating)
      expect(rating.valid?).to eq(true)
    end
  end
end
