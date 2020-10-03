require 'rails_helper'

describe 'Exercises API', type: :request do
  describe 'GET /api/v1/available_exercises' do
    let!(:training_program) { create(:training_program) }
    let!(:path) { "/api/v1/#{training_program.id}/available_exercises" }
    let!(:exercises) { create_list(:exercise, 3) }

    before do
      do_request(:get, path)
    end

    it 'return 200 status' do
      expect(response).to be_successful
    end

    it 'returns list of available exercises' do
      expect(JSON.parse(response.body).length).to eq 3
    end
  end
end
