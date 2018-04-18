module Api::V1
  class RatingsController < ApplicationController
    before_action :set_rating       , only: [:show, :update, :destroy]
    before_action :authenticate_user, only: [:create, :update, :destroy]
    before_action :ensure_ownership , only: [:update, :destroy]
    before_action :check_for_rating , only: [:create]

    # GET /ratings
    def index
      @ratings = Rating.all

      render json: @ratings
    end

    # GET /ratings/1
    def show
      render json: @rating
    end

    # POST /ratings
    def create
      # rating already initialized in before action
      if @rating.save
        @movie = @rating.movie
        render json: @movie, status: :created
      else
        render json: @rating.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /ratings/1
    def update
      if @rating.update(rating_params)
        render json: @rating
      else
        render json: @rating.errors, status: :unprocessable_entity
      end
    end

    # DELETE /ratings/1
    def destroy
      @rating.destroy
    end

    # GET /ratings/movies_count
    def movies_count
      @ratings = []
      (1..5).each do |rating|
        @ratings << { title: "#{rating} Star",
                      movies_count: Movie.by_rating(rating).count,
                      id: rating # for selection purposes by front end
                    }
      end
      render json: @ratings
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_rating
        @rating = Rating.find(params[:id])
      end

      # Check if rating exists, if not create a new one
      def check_for_rating
        @rating = Rating.find_or_initialize_by(movie_id: rating_params[:movie_id],user_id: current_user.id)
        @rating.rate = rating_params[:rate]
      end

      # Only allow a trusted parameter "white list" through.
      def rating_params
        params.require(:rating).permit(:rate, :user_id, :movie_id)
      end

      # Only rating owners can update/destroy the ratings
      def ensure_ownership
        if current_user != @rating.user
          render json: {error: "It's not your rating"}.to_json, status: :forbidden
          return
        end
      end
  end
end