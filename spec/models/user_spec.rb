require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }

  it { should have_many(:training_programs).dependent(:destroy) }
  it { should have_many(:comments).dependent(:destroy) }
  it { should have_many(:training_plans).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
  it { should validate_length_of(:name).is_at_most(20) }
end
