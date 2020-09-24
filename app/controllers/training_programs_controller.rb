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

    flash.notice = 'Training program has been successfully created' if @training_program.save
  end

  def update
    
  end

  def destroy
    
  end

  private

  def training_program_params
    params.require(:training_program).permit(:title)
  end
end
