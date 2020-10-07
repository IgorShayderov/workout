class Exercise < ApplicationRecord
  has_many :training_program_exercises
  has_many :training_programs, through: :training_program_exercises, dependent: :destroy

  scope :created_exercises, ->(training_program_id, exercises) { joins(:training_program_exercises).where(training_program_exercises: { id: exercises, training_program_id: training_program_id }) }
  scope :available_exercises, ->(location) { where(location: location) }

  validates :location, presence: true
  validates :title, uniqueness: true, presence: true
end
