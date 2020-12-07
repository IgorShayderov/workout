# frozen_string_literal: true

class ChangeTrainingProgramExercisesCountToSets < ActiveRecord::Migration[6.0]
  def change
    rename_column :training_program_exercises, :count, :reps
  end
end
