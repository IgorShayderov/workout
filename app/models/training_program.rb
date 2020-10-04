class TrainingProgram < ApplicationRecord
  belongs_to :user
  has_many :training_program_exercises
  has_many :exercises, through: :training_program_exercises, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
  validates :location, presence: true

  def sorted_exercises
    exercises.order(created_at: :desc)
  end

  def available_exercises
    Exercise.where(location: self.location)
  end
end
