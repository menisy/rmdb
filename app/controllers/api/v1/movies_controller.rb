module Api::V1
  class MoviesController < ApplicationController
    before_action :set_movie        , only: [:show, :update, :destroy]
    before_action :set_category     , only: [:index]
    before_action :set_rating       , only: [:index]
    before_action :authenticate_user, only: [:create, :update, :destroy, :user_movies]
    before_action :ensure_ownership , only: [:update, :destroy]

    # GET /movies
    def index
        @movies = Movie.by_category(@category.id) if @category
        @movies = (@movies || Movie).by_rating(@rating) if @rating
        @movies ||= Movie.all
        @movies = search(@movies)

        render json: @movies   
    end

    def user_movies
        @user_movies = search(current_user.movies)

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

      def set_rating
        @rating = params[:rating] if params[:rating].present?
      end

      def set_category
        @category = Category.find(params[:category_id]) if params[:category_id].present?
      end

      # Only movie owners can update/destroy the movies
      def ensure_ownership
        if current_user != @movie.user
          render json: {error: "It's not your movie"}.to_json, status: :forbidden
          return
        end
      end

      # Only allow a trusted parameter "white list" through.
      def movie_params
        params.require(:movie).permit(:title, :description, :category_id, :user_id)
      end

      # Search through movies and present to include category title,
      # user username, and avg_rating method
      def search(movies)
        movies.search(params[:text])
      end
  end
end
