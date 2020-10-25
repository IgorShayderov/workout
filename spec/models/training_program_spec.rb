require 'rails_helper'

RSpec.describe TrainingProgram, type: :model do
  let!(:training_program) { create(:training_program_with_exercises) }

  it { should belong_to(:user) }
  it { should have_many(:training_program_exercises) }
  it { should have_many(:exercises).through(:training_program_exercises).dependent(:destroy) }
  it { should have_many(:comments).dependent(:destroy) }
  it { should have_many(:training_plans).dependent(:destroy) }

  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title) }
  it { should validate_length_of(:description).is_at_most 250 }
  it { should validate_presence_of(:location) }

  describe '#add_exercises' do
    let!(:exercise) { create(:exercise) }

    context 'with valid params' do
      let(:added_exercises) { [{ exercise_id: exercise.id, count: 1 }] }

      it 'creates training_program_exercises in database' do
        expect { training_program.add_exercises(added_exercises) }.to change(TrainingProgramExercise, :count).by(1)
      end

      it 'returns created exercises ids' do
        result = training_program.add_exercises(added_exercises)

        expect(result).to have_key(:exercises_ids)
        expect(result[:exercises_ids]).to include(exercise.id)

      end
    end

    context 'with invalid params' do
      let(:added_exercises) { [{ exercise_id: 0, count: 1 }] }

      it 'creates training_program_exercises in database' do
        expect { training_program.add_exercises(added_exercises) }.to change(TrainingProgramExercise, :count).by(0)
      end

      it 'throws error while record is invalid' do
        result = training_program.add_exercises(added_exercises)

        expect(result).to have_key(:errors)
        expect(result[:errors]).to include('Validation failed: Exercise must exist')
      end
    end
  end
end
