require 'rails_helper'

RSpec.describe TrainingProgram, type: :model do
  let!(:training_program) { create(:training_program) }

  it { should belong_to(:user) }
  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title) }
  it { should validate_length_of(:description).is_at_most 250 }
end
