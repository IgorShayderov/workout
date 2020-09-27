class TrainingProgram < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
end
