class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :training_program

  validates :body, presence: true
end
