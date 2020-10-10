class TrainingProgram < ApplicationRecord
  belongs_to :user
  has_many :training_program_exercises
  has_many :exercises, through: :training_program_exercises, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
  validates :location, presence: true

  def create_exercises(exercises)
    result = {
      exercises_ids: [],
      errors: [],
    }

    begin
      ActiveRecord::Base.transaction do
        exercises.each do |exercise|
          new_exercise = training_program_exercises.create!(exercise_id: exercise[:exercise_id], count: exercise[:count])

          result[:exercises_ids].push(new_exercise.id)
        end
      end

      rescue ActiveRecord::RecordInvalid => exception

      result[:errors].push(exception.message)
    end

    result
  end
end
