module Api::V1
  class MoviesController < ApplicationController
    before_action :set_movie                , only: [:show, :update, :destroy]
    before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy, :user_movies]
    before_action :ensure_ownership         , only: [:update, :destroy]
    before_action :check_mine_param         , only: [:index]

    # GET /movies
    def index
      @movies = filter(@movies)
      @movies = search(@movies)
      set_pagination
      #render json: @movies
    end

    def user_movies
      @user_movies = filter(current_api_v1_user.movies)
      @user_movies = search(@user_movies)
      set_pagination
      render :index
    end

    # GET /movies/1
    def show
    end

    # POST /movies
    def create
      @movie = current_api_v1_user.movies.new(movie_params)

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
      if @movie.destroy
        head :no_content, status: :ok
      else
        render json: @movie.errors, status: :unprocessable_entity
      end
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
        if current_api_v1_user != @movie.user
          render json: { error: "It's not your movie" }, status: :forbidden
          return
        end
      end

      # Set the variables for pagination
      def set_pagination
        all_count = @movies.count
        page = params[:page].to_i
        per = params[:per].to_f
        per = 12 if per.zero?
        @movies = @movies.page(page).
                          per(per)
        @page, @per, @pages, @all_count = page, per,
                                          @movies.total_pages,
                                          all_count
      end

      # Check for mine param
      def check_mine_param
        if params[:mine].present? &&
            params[:mine] == "true" &&
            current_api_v1_user
          @movies = current_api_v1_user.movies
        else
          @movies = Movie.includes(:user, :category, :ratings)
        end
      end

      # Only allow a trusted parameter "white list" through.
      def movie_params
        params.require(:movie).permit(:title, :description,
                                       :category_id, :user_id)
      end
  end
end
