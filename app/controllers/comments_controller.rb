class CommentsController < ApplicationController
  before_action :get_training_program, only: %i[index create]

  def index
    @comments = @training_program.comments

    render json: @comments
  end

  def create
    @comment = @training_program.comments.new(comment_params.merge(user: current_user))

    if @comment.save
      render json: @comment
    else
      render json: { errors: @comment.errors }
    end
  end

  private

  def get_training_program
    @training_program = TrainingProgram.find(params[:training_program_id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
