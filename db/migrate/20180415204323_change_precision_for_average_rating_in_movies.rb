class ChangePrecisionForAverageRatingInMovies < ActiveRecord::Migration[5.1]
  def change
    change_column :movies, :average_rating, :float, default: 0.0, precision: 2, scale: 1
  end
end
