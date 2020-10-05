class TrainingProgramExercise < ApplicationRecord
  belongs_to :training_program
  belongs_to :exercise

  validate :validate_exercises_number, on: :create

  private

  def validate_exercises_number
    if training_program.present?
      errors.add(:training_program, 'can have only 10 exercises') if training_program.training_program_exercises.count >= 10
    end
  end
end
