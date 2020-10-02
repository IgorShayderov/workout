require 'rails_helper'

RSpec.describe Exercise, type: :model do
  let!(:exercise) { create(:exercise) }

  it { should have_many(:training_program_exercises) }
  it { should have_many(:training_programs).through(:training_program_exercises).dependent(:destroy) }

  it { should validate_presence_of(:location) }
  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title) }
end
