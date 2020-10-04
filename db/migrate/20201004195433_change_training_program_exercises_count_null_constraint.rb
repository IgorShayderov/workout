class ChangeTrainingProgramExercisesCountNullConstraint < ActiveRecord::Migration[6.0]
  def change
    change_column :training_program_exercises, :count, :integer, null: true
  end
end
