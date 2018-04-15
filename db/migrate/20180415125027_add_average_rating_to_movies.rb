class AddAverageRatingToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :average_rating, :float, default: 0.0
  end
end
