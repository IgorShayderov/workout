class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :training_programs, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :training_plans, dependent: :destroy

  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
end
