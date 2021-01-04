# frozen_string_literal: true

class ExercisesController < ApplicationController
  before_action :find_training_program, only: %i[index available]
  before_action :find_exercise, only: %i[update destroy]

  def index
    render json: params[:training_program_id] ? @training_program.exercises : Exercise.all_with_images
  end

  def create
    @exercise = Exercise.new(exercise_params)

    @exercise.image.attach(exercise_params[:image]) if exercise_params[:image].present?

    if @exercise.save
      render json: @exercise
    else
      render json: { errors: @exercise.errors }
    end
  end

  def update
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: { errors: @exercise.errors }
    end
  end

  def destroy
    render json: @exercise.destroy
  end

  def available
    available_exercises = Exercise.available_exercises(@training_program.location)

    render json: available_exercises
  end

  private

  def find_training_program
    @training_program = TrainingProgram.find(params[:training_program_id]) if params[:training_program_id]
  end

  def exercise_params
    params.require(:exercise).permit(:location, :title, :image)
  end

  def find_exercise
    @exercise = Exercise.find(params[:id])
  end
end
