class User < ApplicationRecord

# Relations
  has_many :movies
  has_many :ratings

# Validations
  validates :email, uniqueness: true
  validates :username, uniqueness: true
end
