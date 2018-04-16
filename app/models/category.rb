class Category < ApplicationRecord

  # Relations
  has_many :movies, dependent: :destroy

  # Validations
  validates :title, presence: true,
                    uniqueness: { case_sensitive: false }

  # Methods

  def movies_count
    movies.count
  end

  # Override as_json to include movies_count
  def as_json(options = { })
    # check for as_json(nil) and bypasses
    # our default...
    super((options || { }).merge({
      methods: [ :movies_count ]
    }))
  end
end
