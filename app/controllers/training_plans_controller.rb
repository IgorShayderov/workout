class TrainingPlansController < ApplicationController
  def index
    year = params[:year].to_i
    month = params[:month].to_i
    day = params[:day].to_i
    date = Date.new(year, month, day)

    training_plans = TrainingPlan.all.where('start_time BETWEEN :min_time AND :max_time', min_time: date.beginning_of_day, max_time: date.end_of_day)

    render json: training_plans
  end

  def create
    @training_program = TrainingProgram.find(params[:training_program_id])
    @training_plan = @training_program.training_plans.new(training_plan_params.merge(user: current_user))

    if @training_plan.save
      render json: @training_plan
    else
      render json: { errors: @training_plan.errors }
    end
  end

  private

  def training_plan_params
    params.require(:training_plan).permit(:start_time, :end_time)
  end
end
