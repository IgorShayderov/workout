require 'rails_helper'

RSpec.describe TrainingPlan, type: :model do
  it { should belong_to(:training_program) }
  it { should belong_to(:user) }

  it { should validate_presence_of(:day) }
end
