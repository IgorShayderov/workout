class Api::V1::ExercisesController < Api::V1::BaseController
  def available_exercises
    available_exercises = TrainingProgram.find(params[:training_program_id]).available_exercises

    render json: available_exercises
  end
end
