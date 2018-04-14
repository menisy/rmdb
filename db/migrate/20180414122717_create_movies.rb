class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :description
      t.integer :category_id
      t.integer :user_id

      t.timestamps
    end
    add_index :movies, :category_id
    add_index :movies, :user_id
  end
end
