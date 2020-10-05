class TrainingProgram < ApplicationRecord
  belongs_to :user
  has_many :training_program_exercises
  has_many :exercises, through: :training_program_exercises, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
  validates :location, presence: true

  def available_exercises
    Exercise.where(location: self.location)
  end

  def created_exercises(created_at)
    exercises.joins(:training_program_exercises).where(training_program_exercise: { created_at: created_at })
  end
end
