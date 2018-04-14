require "rails_helper"

RSpec.describe Movie, :type => :model do
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
      expect(movie.valid?).to be(true)
    end
  end
end
