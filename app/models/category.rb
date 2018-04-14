class Category < ApplicationRecord

# Relations
  has_many :movies

# Validations
  validates :title, presence: true
end
