require "rails_helper"

describe Category, :type => :model do
  context "validations" do
    it "shouldn't create category with blank title" do
      category = build(:category, title: '')
      category.valid?
      expect(category.errors[:title]).to include("can't be blank")
    end

    it "shouldn't create category with the same name (case sensetive)" do
      category1 = create(:category, title: 'Comedy')
      category2 = build(:category, title: 'Comedy')
      category2.valid?
      expect(category2.errors[:title]).to include("has already been taken")
    end

    it "shouldn't create category with the same name (not case sensetive)" do
      category1 = create(:category, title: 'Comedy')
      category2 = build(:category, title: 'ComeDy')
      category2.valid?
      expect(category2.errors[:title]).to include("has already been taken")
    end

    it "should create category with no errors" do
      category = create(:category)
      expect(category.valid?).to be(true)
    end
  end

  context "relations" do
    it "should destroy dependent movies when destroyed" do
      category = create(:category)
      movie = create(:movie, category: category)

      expect(Movie.count).to be(1)

      category.destroy

      expect(Movie.count).to be(0)
    end
  end
end
