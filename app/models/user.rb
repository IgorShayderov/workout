# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :training_programs, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :training_plans, dependent: :destroy

  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }

  def training_programs_with_exercises
    training_programs.map do |training_program|
      handled_program = training_program.as_json
      handled_program[:exercises] = training_program.exercises
      handled_program
    end
  end
end
