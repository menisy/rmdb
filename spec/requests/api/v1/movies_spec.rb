require "rails_helper"

# Authentication helper method
def authenticated_header(user)
  token = Knock::AuthToken.new(payload: { sub: user.id }).token
  { "Authorization": "Bearer #{token}" }
end

describe "Movies API requests" do
  context "response format and data" do
    it 'index action should return valid JSON' do
      pending "to be implemented"
    end

    it 'show action should return valid JSON' do
      pending "to be implemented"
    end

    it 'user_movies action should return valid JSON' do
      pending "to be implemented"
    end

    it 'create action should return valid JSON' do
      pending "to be implemented"
    end

    it 'update action should return valid JSON' do
      pending "to be implemented"
    end

    it 'destroy action should return valid JSON' do
      pending "to be implemented"
    end

    it 'should return all data that was set' do
      pending "to be implemented"
    end

    it 'should return category along with each movie' do
      pending "to be implemented"
    end

    it 'should return user along with each movie' do
      pending "to be implemented"
    end

    it 'should return movies within a category' do
      pending "to be implemented"
    end

    it 'should return movies paginated' do
      pending "to be implemented"
    end
  end

  context "non logged in users" do
    it 'should respond with success' do
      movies = create_list(:movie, 10)
      get '/api/v1/movies'
      # test for the 200 status-code
      expect(response).to be_success
    end

    ### Not working after using jbuilder
    ### known issue, see
    # https://github.com/rails/rails/issues/25183
    it 'should respond with movies list' do
      movies = create_list(:movie, 10)
      get api_v1_movies_path
      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the right amount of movies are returned
      expect(resp.size).to eq(movies.length)
    end

    it 'should respond with single movie' do
      movie = create(:movie)
      get api_v1_movie_path(movie)
      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the same movie is returned
      expect(resp['id']).to eq(movie.id)
    end

    it 'should not be allowed to create movie' do
      movie = build(:movie)
      params = { movie: JSON.parse(movie.to_json) }
      post api_v1_movies_path, params: params

      # test for the 401 status-code
      resp = JSON.parse(response.body)

      expect(response).to be_unauthorized
      expect(resp["errors"][0]).to include('You need to sign in or sign up')
      # make sure no movies were created
      expect(Movie.count).to eq(0)
    end

    it 'should not be allowed to edit movie' do
      movie = create(:movie)
      # prepare request params
      params = { movie: { description: 'such a cool movie' } }
      put "/api/v1/movies/#{movie.id}", params: params
      # test for the 401 status-code
      resp = JSON.parse(response.body)

      expect(response).to be_unauthorized
      expect(resp["errors"][0]).to include('You need to sign in or sign up')
    end

    it 'should not be allowed to delete movie' do
      movie = create(:movie)
      # make sure movie exists before request
      expect(Movie.count).to eq(1)
      delete api_v1_movie_path(movie)
      # test for the 401 status-code
      resp = JSON.parse(response.body)

      expect(response).to be_unauthorized
      expect(resp["errors"][0]).to include('You need to sign in or sign up')
      # make sure movie still exists after request
      expect(Movie.count).to eq(1)
    end

    it 'should not respond with user movies list' do
      get user_movies_api_v1_movies_path
      # test for the 200 status-code
      resp = JSON.parse(response.body)

      expect(response).to be_unauthorized
      expect(resp["errors"][0]).to include('You need to sign in or sign up')
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
      post api_v1_movies_path, params: params,
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure the movie is created
      expect(Movie.count).to eq(1)
      # make sure it's his movie
      expect(Movie.first.user).to eq(user)
    end

    it 'should not be allowed to edit a movie they do not own' do
      user1 = create(:user)
      movie = create(:movie, user: user1)
      user2 = create(:user)
      params = { movie: { title: 'editted title' } }
      # make sure movie title is not editted title before request
      expect(movie.title).not_to eq('editted title')
      # make request with authorized user2
      put api_v1_movie_path(movie), params: params,
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
      put api_v1_movie_path(movie), params: params,
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
      delete api_v1_movie_path(movie),
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
      delete api_v1_movie_path(movie),
        headers: authenticated_header(user)
      # test for the 200 status-code
      expect(response).to be_success
      # make sure movie is deleted after request
      expect(Movie.count).to eq(0)
    end

    it 'should respond with user movies list' do
      user = create(:user)
      movie1 = create(:movie, user: user)
      movie2 = create(:movie, user: user)
      movie3 = create(:movie, user: user)

      get user_movies_api_v1_movies_path,
        headers: authenticated_header(user)
      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      expect(resp.length).to eq(3)
    end

    it 'should redirect and respond with user movies list' do
      user = create(:user)
      movie1 = create(:movie, user: user)
      movie2 = create(:movie, user: user)
      movie3 = create(:movie, user: user)

      get api_v1_movies_path(mine: true),
        headers: authenticated_header(user)
      resp = JSON.parse(response.body)
      # test for the 200 status-code
      expect(response).to be_success
      expect(resp.length).to eq(3)
    end
  end
end
