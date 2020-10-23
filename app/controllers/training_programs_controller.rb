class TrainingProgramsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_training_program, only: %i[add_exercises]

  def index
    @training_programs = current_user.training_programs

    gon.push({
      training_programs: @training_programs,
      user: current_user,
      root: root_path,
    })
  end

  def create
    @training_program = current_user.training_programs.new(training_program_params)

    if @training_program.save
      render json: @training_program
    else
      render json: { errors: @training_program.errors }
    end
  end

  def update
    
  end

  def destroy
    
  end

  def add_exercises
    result = @training_program.add_exercises(params[:exercises])

    if result[:errors].empty?
      render json: Exercise.created_exercises(@training_program.id, result[:exercises_ids])
    else
      render json: { errors: result[:errors] }
    end
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:id])
  end

  def training_program_params
    params.require(:training_program).permit(:title, :description, :location)
  end
end
