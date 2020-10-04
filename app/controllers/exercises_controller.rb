class ExercisesController < ApplicationController
  before_action :get_training_program, only: %i[available_exercises training_program_exercises save_exercises]

  def available_exercises
    available_exercises = @training_program.available_exercises

    render json: available_exercises
  end

  def training_program_exercises
    render json: @training_program.sorted_exercises
  end

  def save_exercises
    ActiveRecord::Base.transaction do
      params[:exercises].each do |exercise|
        @training_program.training_program_exercises.create!(exercise_id: exercise[:exercise_id], count: exercise[:count])
      end
    end

    render json: @training_program.training_program_exercises
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id])
  end
end
