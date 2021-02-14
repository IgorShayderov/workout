class ProfilesController < ApplicationController
  def admin?
    render json: current_user.admin?
  end
end
