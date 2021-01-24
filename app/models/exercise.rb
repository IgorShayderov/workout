# frozen_string_literal: true

class Exercise < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :training_program_exercises
  has_many :training_programs, through: :training_program_exercises, dependent: :destroy

  has_one_attached :image, dependent: :destroy

  scope :created_exercises, lambda { |training_program_id, exercises_ids|
    joins(:training_program_exercises)
    .select('exercises.id, title, training_program_exercises.id AS training_program_exercise_id')
    .where(training_program_exercises: { id: exercises_ids, training_program_id: training_program_id })
    .as_json
  }
  scope :all_with_images, lambda {
    with_attached_image
    .map do |exercise|
      image = exercise.image

      exercise_with_image = exercise.as_json

      if image.attached?
        exercise_with_image[:image] = {
          id: image.id,
          url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true),
          filename: image.blob.filename
        }
      end

      exercise_with_image
    end
  }

  validates :title, uniqueness: true, presence: true
end
