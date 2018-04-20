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
  validates :nickname , presence: true,
                        uniqueness: { case_sensitive: false }
end
