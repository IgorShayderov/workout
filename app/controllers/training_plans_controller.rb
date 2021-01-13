# frozen_string_literal: true

class TrainingPlansController < ApplicationController
  def index
    year = params[:year].to_i
    month = params[:month].to_i
    day = params[:day].to_i
    date = Date.new(year, month, day)

    training_plans = TrainingPlan.plans_for_date(date)

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

  def calendar_rendering_data
    calendar_data = Calendar.instance.collect_calendar_data

    render json: calendar_data
  end

  private

  def training_plan_params
    params.require(:training_plan).permit(:start_time, :end_time)
  end
end
