class User < ApplicationRecord

  # Auth
  has_secure_password

  # Relations
  has_many :movies
  has_many :ratings

  # Validations
  validates :email    , presence: true, 
                        uniqueness: { case_sensitive: false}
  validates_with EmailAddress::ActiveRecordValidator, field: :email

  validates :username , presence: true,
                        uniqueness: { case_sensitive: false }

  validates :password, length: { minimum: 6 }, allow_nil: true
end
