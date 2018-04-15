require "rails_helper"

# Authentication helper method
def authenticated_header(user)
  token = Knock::AuthToken.new(payload: { sub: user.id }).token
  { "Authorization": "Bearer #{token}" }
end

describe "Movies API requests" do
  context "non logged in users" do
    it 'should respond with success' do
      movies = create_list(:movie, 10)
      get '/api/v1/movies'
      # test for the 200 status-code
      expect(response).to be_success
    end

    it 'should respond with movies list' do
      movies = create_list(:movie, 10)
      get '/api/v1/movies'
      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the right amount of movies are returned
      expect(resp.size).to eq(movies.length)
    end

    it 'should respond with single movie' do
      movie = create(:movie)
      get "/api/v1/movies/#{movie.id}"
      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the same movie is returned
      expect(resp['id']).to eq(movie.id)
    end

    it 'should not be allowed to create movie' do
      movie = build(:movie)
      params = { movie: JSON.parse(movie.to_json) }
      post "/api/v1/movies/", params: params

      # test for the 401 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
      # make sure no movies were created
      expect(Movie.count).to eq(0)
    end

    it 'should not be allowed to edit movie' do
      movie = create(:movie)
      # prepare request params
      params = { movie: { description: 'such a cool movie' } }
      put "/api/v1/movies/#{movie.id}", params: params
      # test for the 401 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
    end

    it 'should not be allowed to delete movie' do
      movie = create(:movie)
      # make sure movie exists before request
      expect(Movie.count).to eq(1)
      delete "/api/v1/movies/#{movie.id}"
      # test for the 401 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
      # make sure movie still exists after request
      expect(Movie.count).to eq(1)
    end

    it 'should not respond with user movies list' do
      get '/api/v1/movies/user_movies'
      # test for the 200 status-code
      expect(response).to be_unauthorized
      expect(response.body).to be_blank
    end
  end

  context "logged in users" do
    it 'should be allowed to create movie' do
      movie = build(:movie)
      user = create(:user)
      # make sure no movies exist before request
      expect(Movie.count).to eq(0)
      # prepare request params
      params = { movie: JSON.parse(movie.to_json) }
      post "/api/v1/movies/", params: params, 
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the movie is created
      expect(Movie.count).to eq(1)
    end

    it 'should not be allowed to edit a movie they do not own' do
      user1 = create(:user)
      movie = create(:movie, user: user1)
      user2 = create(:user)
      params = { movie: { title: 'editted title' } }
      # make sure movie title is not editted title before request
      expect(movie.title).not_to eq('editted title')
      # make request with authorized user2
      put "/api/v1/movies/#{movie.id}", params: params,
        headers: authenticated_header(user2)
      resp = JSON.parse(response.body)
      # test for the 403 status-code
      expect(response).to be_forbidden
      expect(resp["error"]).to include("It's not your movie")
      # make sure the movie didn't get the editted title
      expect(movie.reload.title).not_to eq('editted title')
    end

    it 'should be allowed to edit a movie they own' do
      user = create(:user)
      movie = create(:movie, user: user)
      params = { movie: { title: 'editted title' } }
      # make sure movie title is not editted title before request
      expect(movie.title).not_to eq('editted title')
      # make request with authorized user
      put "/api/v1/movies/#{movie.id}", params: params,
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the movie title was editted
      expect(movie.reload.title).to eq('editted title')
    end

    it 'should not be allowed to delete a movie they do not own' do
      user1 = create(:user)
      movie = create(:movie, user: user1)
      user2 = create(:user)

      # make sure movie exists before request
      expect(Movie.count).to eq(1)
      # make request with authorized user2
      delete "/api/v1/movies/#{movie.id}",
        headers: authenticated_header(user2)
      resp = JSON.parse(response.body)
      # test for the 403 status-code
      expect(response).to be_forbidden
      expect(resp["error"]).to include("It's not your movie")
      # make sure movie still exists after request
      expect(Movie.count).to eq(1)
    end

    it 'should be allowed to delete a movie they own' do
      user = create(:user)
      movie = create(:movie, user: user)
      # make sure movie exists before request
      expect(Movie.count).to eq(1)
      # make request with authorized user
      delete "/api/v1/movies/#{movie.id}",
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure movie is deleted after request
      expect(Movie.count).to eq(0)
    end
  end
end