# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Exercise, type: :model do
  let!(:exercise) { create(:exercise) }

  it { should have_many(:training_program_exercises) }
  it { should have_many(:training_programs).through(:training_program_exercises).dependent(:destroy) }

  it 'have one attached image' do
    expect(Exercise.new.image).to be_an_instance_of(ActiveStorage::Attached::One)
  end

  it { should validate_presence_of(:location) }
  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title) }

  let(:training_program) { create(:training_program, location: 'outdoors') }
  let(:first_exercise) { create(:exercise, location: training_program.location) }
  let(:second_exercise) { create(:exercise, location: 'gym') }

  describe '.created_exercises' do
    let(:first_training_exercise) do
      create(:training_program_exercise, training_program: training_program, exercise: first_exercise)
    end

    it 'should include created exercise' do
      expect(Exercise.created_exercises(training_program.id, [first_training_exercise.id])).to include(first_exercise)
    end

    it 'should not include non-created exercise' do
      expect(Exercise.created_exercises(training_program.id, [first_training_exercise.id])).to_not include(second_exercise)
    end
  end

  describe '.available_exercises' do
    it 'should return exercises with same location' do
      expect(Exercise.available_exercises(training_program.location)).to include(first_exercise)
    end

    it 'should not return exercises with another location' do
      expect(Exercise.available_exercises(training_program.location)).to_not include(second_exercise)
    end
  end
end
