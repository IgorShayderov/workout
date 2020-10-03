require 'rails_helper'

describe 'Exercises API', type: :request do
  let!(:training_program) { create(:training_program) }

  describe 'GET /api/v1/available_exercises' do
    let!(:path) { "/api/v1/#{training_program.id}/available_exercises" }
    let!(:exercises) { create_list(:exercise, 3) }
    let(:exercise_response) { json.first }

    before do
      do_request(:get, path)
    end

    it 'return 200 status' do
      expect(response).to be_successful
    end

    it 'returns list of available exercises' do
      expect(json.length).to eq 3
    end

    it 'returns all public fields' do
      %w[id location title created_at updated_at].each do |attr|
        expect(exercise_response[attr]).to eq exercises.first.send(attr).as_json
      end
    end
  end

  describe 'GET /api/v1/training_program_exercises' do
    let!(:path) { "/api/v1/#{training_program.id}/training_program_exercises" }
    let!(:training_program_exercise) { create(:training_program_exercise, training_program: training_program) }
    let(:exercise_response) { json.first }

    before do
      do_request(:get, path)
    end

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'returns list of available exercises' do
      expect(json.length).to eq 1
    end

    it 'returns all public fields' do
      %w[id exercise_id training_program_id count created_at updated_at].each do |attr|
        expect(exercise_response[attr]).to eq training_program_exercise.send(attr).as_json
      end
    end
  end
end
