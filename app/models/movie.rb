class Movie < ApplicationRecord
 
# Relations
  belongs_to :category
  belongs_to :user
  has_many :ratings, inverse_of: :movie

# Validations
  validates :title      , presence: true
  validates :description, presence: true
  validates :user       , presence: true
  validates :category   , presence: true
end
