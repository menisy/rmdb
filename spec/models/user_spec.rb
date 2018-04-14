require "rails_helper"

describe User, :type => :model do
  context "validations" do
    it "shouldn't create user with blank email" do
      user = build(:user, email: '')
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "shouldn't create user with invalid email" do
      user = build(:user, email: 'notanemail')
      user.valid?
      expect(user.errors[:email]).to include("Invalid Email Address")
    end

    it "shouldn't create user with blank username" do
      user = build(:user, username: '')
      user.valid?
      expect(user.errors[:username]).to include("can't be blank")
    end

    it "shouldn't create user with blank password" do
      user = build(:user, password: '')
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "shouldn't create user with password length less than 6" do
      user = build(:user, password: '1234')
      user.valid?
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end

    it "shouldn't create user with mismatching password and password_confirmation" do
      user = build(:user, password: '123456', password_confirmation: '1234567')
      user.valid?
      expect(user.errors[:password_confirmation]).to include("doesn't match Password")
    end

    it "shouldn't create 2 users with same email (case sensetive)" do
      user1 = create(:user, email: 'test@email.com')
      user2 = build(:user, email: 'test@email.com')
      user2.valid?
      expect(user2.errors[:email]).to include("has already been taken")
    end

    it "shouldn't create 2 users with same email (not case sensetive)" do
      user1 = create(:user, email: 'test@email.com')
      user2 = build(:user, email: 'teSt@Email.com')
      user2.valid?
      expect(user2.errors[:email]).to include("has already been taken")
    end

    it "shouldn't create user with same username (case sensetive)" do
      user1 = create(:user, username: 'cool_username')
      user2 = build(:user, username: 'cool_username')
      user2.valid?
      expect(user2.errors[:username]).to include("has already been taken")
    end

    it "shouldn't create user with same username (not case sensetive)" do
      user1 = create(:user, username: 'cool_username')
      user2 = build(:user, username: 'cOol_userName')
      user2.valid?
      expect(user2.errors[:username]).to include("has already been taken")
    end

    it "should create user with no errors" do
      user = create(:user)
      expect(user.valid?).to be(true)
    end
  end

  context "relations" do
    it "should destroy dependent movies when destroyed" do
      user = create(:user)
      movie = create(:movie, user: user)

      expect(Movie.count).to be(1)

      user.destroy

      expect(Movie.count).to be(0)
    end

    it "should destroy dependent ratings when destroyed" do
      user = create(:user)
      rating = create(:rating, user: user)

      expect(Rating.count).to be(1)

      user.destroy

      expect(Rating.count).to be(0)
    end
  end
end
