require 'rails_helper'

RSpec.describe ExercisesController, type: :controller do
  let!(:user) { create(:user) }
  let!(:training_program) { create(:training_program, user: user) }
  let!(:exercises) { create_list(:exercise, 3) }
  let(:response_body) { JSON.parse(response.body) }
  let(:exercise_response) { response_body.first }

  before { login(user) }

  describe 'GET #available_exercises' do

    before { get :available_exercises, params: { training_program_id: training_program.id } }

    it 'return 200 status' do
      expect(response).to be_successful
    end

    it 'returns list of available exercises' do
      expect(response_body.length).to eq 3
    end

    it 'returns all public fields' do
      %w[id location title created_at updated_at].each do |attr|
        expect(exercise_response[attr]).to eq exercises.first.send(attr).as_json
      end
    end
  end

  describe 'GET #training_program_exercises' do
    let!(:training_program_exercise) { create(:training_program_exercise,
                                              training_program: training_program,
                                              exercise: exercises.first) }

    before { get :training_program_exercises, params: { training_program_id: training_program.id } }

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'returns list of available exercises' do
      expect(response_body.length).to eq 1
    end

    it 'returns all public fields' do
      %w[id title location created_at updated_at].each do |attr|
        expect(exercise_response[attr]).to eq exercises.first.send(attr).as_json
      end
    end
  end

  describe 'POST #save_exercises' do
    before do
      post :save_exercises,
            params: { training_program_id: training_program.id, 
                      exercises: [{ exercise_id: exercises.first.id ,count: 0}] }
    end 

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'saves exercises in database' do

      expect { post :save_exercises,
              params: { training_program_id: training_program.id,
                        exercises: [{ exercise_id: exercises.first.id ,count: 0}] } }
      .to change(TrainingProgramExercise, :count).by(1)
    end
  end
end