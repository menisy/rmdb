class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  # Auth


  # Relations
  has_many :movies, dependent: :destroy
  has_many :ratings, dependent: :destroy

  # Validations
  validates :nickname , presence: true,
                        uniqueness: { case_sensitive: false }


  # Methods
  def rating_for_movie(movie)
    rating = self.ratings.find_by movie_id: movie.id
    rating ? rating.rate : 0
  end
end
