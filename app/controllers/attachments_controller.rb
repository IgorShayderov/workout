# frozen_string_literal: true

class AttachmentsController < ApplicationController
  def destroy
    @attachment = ActiveStorage::Attachment.find(params[:id])
    @attachment.purge

    head :no_content
  rescue StandartError => error
    render json: { errors: error }
  end
end
