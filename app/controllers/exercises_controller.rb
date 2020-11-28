# frozen_string_literal: true

class ExercisesController < ApplicationController
  before_action :get_training_program, only: %i[index available]

  def index
    render json: params[:training_program_id] ? @training_program.exercises : Exercise.all
  end

  def create
    @exercise = Exercise.new(exercise_params)

    if @exercise.save
      render json: @exercise
    else
      render json: { errors: @exercise.errors }
    end
  end

  def update
    
  end

  def destroy
    
  end

  def available
    available_exercises = Exercise.available_exercises(@training_program.location)

    render json: available_exercises
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id]) if params[:training_program_id]
  end

  def exercise_params
    params.require(:exercise).permit(:location, :title)
  end
end

# params.require(:training_program).permit(:title, :description, :location)
