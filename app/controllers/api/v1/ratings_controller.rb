module Api::V1
  class RatingsController < ApplicationController
    before_action :set_rating       , only: [:show, :update, :destroy]
    before_action :authenticate_user, only: [:create, :update, :destroy]
    before_action :ensure_ownership , only: [:update, :destroy]

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
      @rating = Rating.new(rating_params)

      if @rating.save
        render json: @rating, status: :created
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
        @ratings << { title: "#{rating} Star", movies_count: Movie.by_rating(rating).count }
      end
      render json: @ratings
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_rating
        @rating = Rating.find(params[:id])
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