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
    result = @training_program.create_exercises(params[:exercises])

    if result[:errors].empty?
      render json: Exercise.created_exercises(@training_program.id, result[:exercises_ids])
    else
      render json: { errors: result[:errors] }
    end
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id])
  end
end
