class User < ApplicationRecord

  # Auth
  has_secure_password

  # Relations
  has_many :movies
  has_many :ratings

  # Validations
  validates :email    , presence: true, 
                        uniqueness: true
  validates :username , presence: true,
                        uniqueness: { case_sensitive: false }
end
