class Movie < ApplicationRecord
  include PgSearch
  
  # Relations
  belongs_to :category
  belongs_to :user
  has_many :ratings, inverse_of: :movie, dependent: :destroy

  # Validations
  validates :title      , presence: true
  validates :description, presence: true
  validates :user       , presence: true
  validates :category   , presence: true

  # Search
  pg_search_scope :search_full_text,
    against: [
      :title,
      :description
    ]
  pg_search_scope :search_by_rating,
    associated_against: {
      ratings: [:rate]
    }
  pg_search_scope :search_by_category,
    associated_against: {
      category: [:title]
    }

  # Search and filters
  def self.search(category, rating, text)
    results = order("created_at DESC")
    results = results.search_by_category(category) if category.present?
    results = results.search_by_rating(rating)     if rating.present?
    results = results.search_full_text(text)       if text.present?
    results
  end

  # Methods
  def update_rating
    sum = self.ratings.map(&:rate).reduce(0, :+)
    avg = sum.to_f / self.ratings.count if ratings.any?
    self.average_rating = avg
    self.save
    average_rating
  end
end
