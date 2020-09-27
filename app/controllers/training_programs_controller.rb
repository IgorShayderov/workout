class TrainingProgramsController < ApplicationController
  before_action :authenticate_user!

  def index
    @training_programs = current_user.training_programs
    gon.push({
      training_programs: @training_programs
    })
  end

  def create
    @training_program = current_user.training_programs.new(training_program_params)

    if @training_program.save
      render json: @training_program
    else
      render json: @training_program.errors
    end
  end

  def update
    
  end

  def destroy
    
  end

  private

  def training_program_params
    params.require(:training_program).permit(:title, :description)
  end
end
