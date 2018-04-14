class User < ApplicationRecord

# Knock functionality
  has_secure_password

# Relations
  has_many :movies
  has_many :ratings

# Validations
  validates :email, uniqueness: true
  validates :username, uniqueness: true
end
