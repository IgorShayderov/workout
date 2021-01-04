# frozen_string_literal: true

class TrainingProgramExercise < ApplicationRecord
  belongs_to :training_program
  belongs_to :exercise

  validate :validate_exercises_number, on: :create

  private

  def validate_exercises_number
    exceed_exercise_count = training_program.present? && training_program.training_program_exercises.count >= 10

    errors.add(:training_program, 'can have only 10 exercises') if exceed_exercise_count
  end
end
