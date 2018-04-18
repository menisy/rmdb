require "rails_helper"

# Authentication helper method
def authenticated_header(user)
  token = Knock::AuthToken.new(payload: { sub: user.id }).token
  { "Authorization": "Bearer #{token}" }
end

describe "Ratings API requests" do
  context "non logged in users" do

    it 'should not be allowed to create a rating' do
      rating = build(:rating)
      params = { rating: JSON.parse(rating.to_json) }
      post api_v1_ratings_path, params: params

      # test for the 401 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
      # make sure no movies were created
      expect(Rating.count).to eq(0)
    end

    it 'should not be allowed to edit rating' do
      rating = create(:rating)
      # prepare request params
      params = { rating: { description: 'such a cool rating' } }
      put api_v1_rating_path(rating), params: params
      # test for the 401 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
    end

    it 'should not be allowed to delete rating' do
      rating = create(:rating)
      # make sure rating exists before request
      expect(Rating.count).to eq(1)
      delete api_v1_rating_path(rating)
      # test for the 401 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
      # make sure rating still exists after request
      expect(Rating.count).to eq(1)
    end
  end

  context "logged in users" do
    it 'should be allowed to create rating' do
      rating = build(:rating)
      user = create(:user)
      # make sure no ratings exist before request
      expect(Rating.count).to eq(0)
      # prepare request params
      params = { rating: JSON.parse(rating.to_json) }
      post api_v1_ratings_path, params: params, 
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the rating is created
      expect(Rating.count).to eq(1)
    end

    it 'should not be allowed to edit a rating they do not own' do
      user1 = create(:user)
      rating = create(:rating, user: user1, rate: 2)
      user2 = create(:user)
      params = { rating: { rate: 1 } }
      # make sure rating rate is not 1 before request
      expect(rating.rate).not_to eq(1)
      # make request with authorized user2
      put api_v1_rating_path(rating), params: params,
        headers: authenticated_header(user2)
      resp = JSON.parse(response.body)
      # test for the 403 status-code
      expect(response).to be_forbidden
      expect(resp["error"]).to include("It's not your rating")
      # make sure the rating wasn't editted
      expect(rating.reload.rate).not_to eq(1)
    end

    it 'should be allowed to edit a rating they own' do
      user = create(:user)
      rating = create(:rating, user: user, rate: 2)
      params = { rating: { rate: 1 } }
      # make sure rating rate is not 1 before request
      expect(rating.rate).not_to eq(1)
      # make request with authorized user
      put api_v1_rating_path(rating), params: params,
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the rating was editted
      expect(rating.reload.rate).to eq(1)
    end

    it 'should not be allowed to delete a rating they do not own' do
      user1 = create(:user)
      rating = create(:rating, user: user1)
      user2 = create(:user)

      # make sure rating exists before request
      expect(Rating.count).to eq(1)
      # make request with authorized user2
      delete api_v1_rating_path(rating),
        headers: authenticated_header(user2)
      resp = JSON.parse(response.body)
      # test for the 403 status-code
      expect(response).to be_forbidden
      expect(resp["error"]).to include("It's not your rating")
      # make sure rating still exists after request
      expect(Rating.count).to eq(1)
    end

    it 'should be allowed to delete a rating they own' do
      user = create(:user)
      rating = create(:rating, user: user)
      # make sure rating exists before request
      expect(Rating.count).to eq(1)
      # make request with authorized user
      delete api_v1_rating_path(rating),
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure rating is deleted after request
      expect(Rating.count).to eq(0)
    end
  end

  context "response format and data" do
    it "should return movies count for each rating" do
      movie1 = create(:movie)
      movie2 = create(:movie)
      movie3 = create(:movie)
      rating1 = create(:rating, rate: 1, movie: movie1)
      rating2 = create(:rating, rate: 1, movie: movie1.reload)
      rating2 = create(:rating, rate: 2, movie: movie2)
      rating2 = create(:rating, rate: 1, movie: movie3)

      get movies_count_api_v1_ratings_path
      # test for the 200 status-code
      expect(response).to be_success
      resp = JSON.parse(response.body)
      # make correct number of movies returned for each rating value
      expect(resp[0]["movies_count"]).to eq(2)
      expect(resp[1]["movies_count"]).to eq(1)
    end

    it "should return movie after rating creation" do
      movie = create(:movie)
      user = create(:user)
      rating = build(:rating, user: user, movie: movie)
      # prepare request params
      params = { rating: JSON.parse(rating.to_json) }
      post api_v1_ratings_path, params: params,
        headers: authenticated_header(user)

      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure movie is returned
      expect(resp["id"]).to eq(movie.id)
      # make sure it has the average rating
      # equal to the sent rating
      expect(resp["average_rating"].to_f).to eq(rating.rate.to_f)
    end
  end
end