# frozen_string_literal: true

class CreateTrainingProgramExercises < ActiveRecord::Migration[6.0]
  def change
    create_table :training_program_exercises do |t|
      t.references :exercise, null: false, foreign_key: true
      t.references :training_program, null: false, foreign_key: true
      t.integer :count, null: false, default: 0

      t.timestamps
    end
  end
end
