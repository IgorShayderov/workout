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
end
