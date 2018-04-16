module Api::V1
  class MoviesController < ApplicationController
    before_action :set_movie        , only: [:show, :update, :destroy]
    before_action :authenticate_user, only: [:create, :update, :destroy, :user_movies]
    before_action :ensure_ownership , only: [:update, :destroy]
    before_action :check_mine_param , only: [:index]

    # GET /movies
    def index
      @movies = filter(@movies)
      @movies = search(@movies)
      render json: @movies
    end

    def user_movies
      @user_movies = filter(current_user.movies)
      @user_movies = search(@user_movies)
      render json: @user_movies
    end

    # GET /movies/1
    def show
      render json: @movie
    end

    # POST /movies
    def create
      @movie = Movie.new(movie_params)

      if @movie.save
        render json: @movie, status: :created
      else
        render json: @movie.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /movies/1
    def update
      if @movie.update(movie_params)
        render json: @movie
      else
        render json: @movie.errors, status: :unprocessable_entity
      end
    end

    # DELETE /movies/1
    def destroy
      @movie.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_movie
        @movie = Movie.find(params[:id])
      end

      # Search movies
      def search(movies)
        movies.search(params[:text])
      end

      # Filter movies according to params
      def filter(movies)
        @category = Category.find(params[:category_id]) if params[:category_id].present?
        @rating = params[:rating] if params[:rating].present?
        @movies = movies.by_category(@category.id) if @category
        @movies = @movies.by_rating(@rating) if @rating
        # If filters return nil, set movies to all the movies which
        # were passed to the method
        @movies ||= movies.all
      end

      # Only movie owners can update/destroy the movies
      def ensure_ownership
        if current_user != @movie.user
          render json: { error: "It's not your movie" }, status: :forbidden
          return
        end
      end

      # Check for mine param
      def check_mine_param
        if params[:mine].present? &&
            params[:mine] == "true" &&
            current_user
          
          @movies = current_user.movies
        else
          @movies = Movie
        end
      end

      # Only allow a trusted parameter "white list" through.
      def movie_params
        params.require(:movie).permit(:title, :description, :category_id, :user_id)
      end
  end
end
