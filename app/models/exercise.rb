class Exercise < ApplicationRecord
  has_many :training_program_exercises
  has_many :training_programs, through: :training_program_exercises, dependent: :destroy

  validates :location, presence: true
  validates :title, uniqueness: true, presence: true
end
