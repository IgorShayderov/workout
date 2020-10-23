class TrainingPlan < ApplicationRecord
  belongs_to :user
  belongs_to :training_program

  scope :plans_for_date, ->(date) { where('start_time BETWEEN :min_time AND :max_time', min_time: date.beginning_of_day, max_time: date.end_of_day) }

  validates :start_time, :end_time, presence: true
end
