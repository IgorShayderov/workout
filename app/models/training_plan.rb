class TrainingPlan < ApplicationRecord
  belongs_to :user
  belongs_to :training_program

  validates :day, presence: true
end
