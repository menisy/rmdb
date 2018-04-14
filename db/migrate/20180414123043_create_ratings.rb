class CreateRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :ratings do |t|
      t.integer :rate
      t.integer :user_id
      t.integer :movie_id

      t.timestamps
    end
    add_index :ratings, :rate
    add_index :ratings, :user_id
    add_index :ratings, :movie_id
  end
end
