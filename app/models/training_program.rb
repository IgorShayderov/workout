class TrainingProgram < ApplicationRecord
  belongs_to :user
  has_many :training_program_exercises
  has_many :exercises, through: :training_program_exercises, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validates :description, length: { maximum: 250 }
  validates :location, presence: true
  validates :exercises, length: { maximum: 10 }

  # написать скоуп для получения всех упражнений, где location совпадает с location тренировочной программы
  # scope :avaliable_exercises, -> {  }
end
