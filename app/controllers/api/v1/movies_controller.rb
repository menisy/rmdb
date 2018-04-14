module Api::V1
  class MoviesController < ApplicationController
    before_action :set_movie        , only: [:show, :update, :destroy]
    before_action :authenticate_user, only: [:create, :update, :destroy]
    before_action :ensure_ownership , only: [:update, :destroy]

    # GET /movies
    def index
      @movies = Movie.all
      @my_movies = current_user.movies if current_user
      
      render json: {movies: @movies, my_movies: @my_movies}
    end

    # GET /movies/1
    def show
      render json: @movie
    end

    # POST /movies
    def create
      @movie = Movie.new(movie_params)

      if @movie.save
        render json: @movie, status: :created, location: @movie
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

      # Only movie owners can update/destroy the movies
      def ensure_ownership
        if current_user != @movie.user
          render json: {error: "It's not your movie!"}.to_json, status: :unauthorized
          return
        end
      end

      # Only allow a trusted parameter "white list" through.
      def movie_params
        params.require(:movie).permit(:title, :description, :category_id, :user_id)
      end
  end
end
