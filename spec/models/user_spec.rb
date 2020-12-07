# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }

  it { should have_many(:training_programs).dependent(:destroy) }
  it { should have_many(:comments).dependent(:destroy) }
  it { should have_many(:training_plans).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
  it { should validate_length_of(:name).is_at_most(20) }

  describe '#training_programs_with_exercises' do
    let!(:training_program) { create(:training_program, user: user) }
    let(:training_programs_with_exercises) { user.training_programs_with_exercises }

    before do
      create_list(:training_program_exercise, 3, training_program: training_program)
    end

    it 'should include exercises key' do
      expect(training_programs_with_exercises.first).to have_key(:exercises)
    end

    it 'should return all exercises' do
      expect(training_programs_with_exercises.first[:exercises].length).to be(3)
    end
  end
end
