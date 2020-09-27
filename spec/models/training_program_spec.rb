require 'rails_helper'

RSpec.describe TrainingProgram, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of :title }
  it { should validate_uniqueness_of :title }
  it { should validate_length_of :description, maximum: 250  }
end
