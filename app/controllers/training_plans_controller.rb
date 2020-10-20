class TrainingPlansController < ApplicationController
  def index
    year = params[:year].to_i
    month = params[:month].to_i
    day = params[:day].to_i

    date = Date.new(year, month, day)

    training_plans = TrainingPlan.all.where(created_at: date.beginning_of_day..date.end_of_day)

    render json: training_plans
  end
end
