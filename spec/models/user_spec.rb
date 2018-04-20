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
      expect(user.errors[:email]).to include("is not an email")
    end

    it "shouldn't create user with blank nickname" do
      user = build(:user, nickname: '')
      user.valid?
      expect(user.errors[:nickname]).to include("can't be blank")
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

    it "shouldn't create user with same nickname (case sensetive)" do
      user1 = create(:user, nickname: 'cool_nickname')
      user2 = build(:user, nickname: 'cool_nickname')
      user2.valid?
      expect(user2.errors[:nickname]).to include("has already been taken")
    end

    it "shouldn't create user with same nickname (not case sensetive)" do
      user1 = create(:user, nickname: 'cool_nickname')
      user2 = build(:user, nickname: 'cOol_nickname')
      user2.valid?
      expect(user2.errors[:nickname]).to include("has already been taken")
    end

    it "should create user with no errors" do
      user = create(:user)
      expect(user.valid?).to eq(true)
    end
  end

  context "relations" do
    it "should destroy dependent movies when destroyed" do
      user = create(:user)
      movie = create(:movie, user: user)

      expect(Movie.count).to eq(1)

      user.destroy

      expect(Movie.count).to eq(0)
    end

    it "should destroy dependent ratings when destroyed" do
      user = create(:user)
      rating = create(:rating, user: user)

      expect(Rating.count).to eq(1)

      user.destroy

      expect(Rating.count).to eq(0)
    end
  end
end
