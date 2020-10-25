class AddSetToTrainingProgramExercises < ActiveRecord::Migration[6.0]
  def change
    add_column :training_program_exercises, :sets, :integer, default: 1
  end
end
