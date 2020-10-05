require 'rails_helper'

RSpec.describe TrainingProgram, type: :model do
  let!(:training_program) { create(:training_program_with_exercises) }

  it { should belong_to(:user) }
  it { should have_many(:training_program_exercises) }
  it { should have_many(:exercises).through(:training_program_exercises).dependent(:destroy) }

  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title) }
  it { should validate_length_of(:description).is_at_most 250 }
  it { should validate_presence_of(:location) }

  describe '#available_exercises' do
    let(:program) { create(:training_program, location: 'outdoors') }
    let(:first_exercise) { create(:exercise, location: program.location) }
    let(:second_exercise) { create(:exercise, location: 'gym') }

    it 'should return exercises with same location' do
      expect(program.available_exercises).to include(first_exercise)
    end

    it 'should not return exercises with another location' do
      expect(program.available_exercises).to_not include(second_exercise)
    end
  end
end
