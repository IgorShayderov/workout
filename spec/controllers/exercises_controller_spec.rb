# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ExercisesController, type: :controller do
  let!(:user) { create(:user) }
  let!(:training_program) { create(:training_program, user: user) }
  let!(:exercises) { create_list(:exercise, 3) }
  let(:response_body) { JSON.parse(response.body) }
  let(:exercise_response) { response_body.first }

  before { login(user) }

  describe 'GET #available' do
    before { get :available, params: { training_program_id: training_program.id } }

    it 'returns 200 status' do
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

  describe 'GET #index' do
    context 'with param' do
      let!(:training_program_exercise) do
        create(:training_program_exercise,
              training_program: training_program,
              exercise: exercises.first)
      end

      before { get :index, params: { training_program_id: training_program.id } }

      it_behaves_like 'exercises from request'

      it 'returns list of available exercises' do
        expect(response_body.length).to eq 1
      end

    end

    context 'without param' do
      before { get :index }

      it_behaves_like 'exercises from request'

      it 'returns list of all exercises' do
        expect(response_body.length).to eq exercises.length
      end

    end
  end
end
