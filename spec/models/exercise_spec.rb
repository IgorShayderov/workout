require 'rails_helper'

RSpec.describe Exercise, type: :model do
  it { should have_many(:training_program_exercises).dependent(:destroy) }

  it { should validate_presence_of(:location) }
end
