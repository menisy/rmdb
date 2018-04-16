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
    ],
    using:  {
              :tsearch => { prefix: true }
            }

  # Scopes
  # Scope movies by rating
  scope :by_rating, ->(rating) { 
    where( average_rating: ((rating.to_f)..((rating.to_f)+0.9))) }

  # scope movies by category
  scope :by_category, ->(category_id) { 
    where(category_id: category_id) }
  
  # Search and filters
  def self.search(text)
    results = order("created_at DESC")
    results = results.search_full_text(text) if text.present?
    results
  end

  # Methods
  def update_rating
    sum = ratings.map(&:rate).reduce(0, :+)
    avg = sum.to_f / ratings.count if ratings.any?
    self.average_rating = avg.round(1)
    save
  end

  # Override as_json to include category and user
  def as_json(options = { })
    # check for as_json(nil) and bypasses
    # our default...
    super((options || { }).merge({
      include: {
        category: { only: [ :title, :id ] },
        user:     { only: :username }
      }
    }))
  end
end
