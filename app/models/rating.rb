class Rating < ApplicationRecord

  # Relations
  belongs_to :user
  belongs_to :movie

  # Validations
  validates :user   , presence: true
  validates :movie  , presence: true
  validates :rate   , presence: true,
                      numericality: { greater_than: 0,
                                      less_than_or_equal_to: 5,
                                      message: 'Rating should be between 1 and 5' }
  validates :user_id, uniqueness: { scope: :movie,
                                      message: "You've already added a rating for this movie" }

  # Callbacks
  after_save do
    movie.update_rating
  end
end
