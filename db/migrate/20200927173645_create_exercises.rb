# frozen_string_literal: true

class CreateExercises < ActiveRecord::Migration[6.0]
  def change
    create_table :exercises do |t|
      t.string :location, null: false
      t.string :title, null: false, unique: true

      t.timestamps
    end
  end
end
