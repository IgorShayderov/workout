class ExercisesController < ApplicationController
  before_action :get_training_program, only: %i[index available]

  def index
    render json: @training_program.exercises
  end

  def available
    available_exercises = Exercise.available_exercises(@training_program.location)

    render json: available_exercises
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id])
  end
end

# params.require(:training_program).permit(:title, :description, :location)
