# frozen_string_literal: true

class TrainingProgram < ApplicationRecord
  belongs_to :user
  has_many :training_program_exercises
  has_many :exercises, through: :training_program_exercises, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :training_plans, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
  validates :location, presence: true

  def add_exercises(exercises)
    result = {
      exercises_ids: [],
      errors: []
    }

    begin
      ActiveRecord::Base.transaction do
        exercises.each do |exercise|
          new_exercise = training_program_exercises.create!(exercise_id: exercise[:exercise_id])

          result[:exercises_ids].push(new_exercise.id)
        end
      end
    rescue ActiveRecord::RecordInvalid => error
      result[:errors].push(error.message)
    end

    result
  end
end
