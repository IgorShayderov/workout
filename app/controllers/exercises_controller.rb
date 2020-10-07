class ExercisesController < ApplicationController
  before_action :get_training_program, only: %i[available_exercises training_program_exercises save_exercises]

  def available_exercises
    available_exercises = Exercise.available_exercises(@training_program.location)

    render json: available_exercises
  end

  def training_program_exercises
    render json: @training_program.exercises
  end

  def save_exercises
    exercises_ids = []

    ActiveRecord::Base.transaction do
      params[:exercises].each do |exercise|
        new_exercise = @training_program.training_program_exercises.create!(exercise_id: exercise[:exercise_id], count: exercise[:count])

        exercises_ids.push(new_exercise.id)
      end
    end

    render json: Exercise.created_exercises(@training_program.id, exercises_ids)
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id])
  end
end
