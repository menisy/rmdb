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
  validates :email    , presence: true,
                        uniqueness: { case_sensitive: false}
  validates_with EmailAddress::ActiveRecordValidator, field: :email, host_validation: :syntax

  validates :nickname , presence: true,
                        uniqueness: { case_sensitive: false }

  validates :password, length: { minimum: 6 }, allow_nil: true
end
