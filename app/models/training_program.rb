class TrainingProgram < ApplicationRecord
  belongs_to :user
  has_many :training_program_exercises, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
  validates :location, presence: true
end
