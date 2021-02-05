# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrainingProgramExercise, type: :model do
  it { should belong_to(:exercise) }
  it { should belong_to(:training_program) }

  describe '#validate_exercises_number' do
    let(:training_program) { create(:training_program) }

    before { create_list(:training_program_exercise, 10, training_program: training_program) }

    it 'does not throws error' do
      expect(training_program.errors).to be_empty
    end

    it 'throws error' do
      training_program.training_program_exercises.new(training_program: training_program)

      expect(training_program.valid?).to be_falsey
      expect(training_program.errors.messages[:training_program_exercises]).to include('is invalid')
    end
  end

  describe '.with_exercise_ids' do
    let!(:training_program) { create(:training_program) }
    let!(:exercise) { create(:exercise) }

    before do
      create(:training_program_exercise)
      create_list(:training_program_exercise, 2, training_program: training_program, exercise: exercise)
    end

    it 'returns exactly count of exercises for certain training program' do
      expect(training_program.training_program_exercises.with_exercise_ids.length).to be(2)
    end

    it 'returns attributes' do
      %w[id training_program_exercise_id title].each do |attr|
        expect(training_program.training_program_exercises.with_exercise_ids.first).to have_key(attr)
      end
    end

    it 'returns hash' do
      expect(training_program.training_program_exercises.with_exercise_ids.first).to be_instance_of(Hash)
    end
  end
end
