class ProfilesController < ApplicationController
  def is_admin
    render json: current_user.admin?
  end
end
