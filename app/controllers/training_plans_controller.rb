class TrainingPlansController < ApplicationController
  before_action :get_training_program, only: %i[index]

  def index
    training_plans = @training_program.training_plans

    render json: training_plans
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id])
  end
end
