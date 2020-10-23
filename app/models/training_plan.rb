class TrainingPlan < ApplicationRecord
  belongs_to :user
  belongs_to :training_program

  validates :start_time, :end_time, presence: true
end
