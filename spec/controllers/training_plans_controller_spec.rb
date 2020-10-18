require 'rails_helper'

RSpec.describe TrainingPlansController, type: :controller do
  let!(:user) { create(:user) }
  let!(:training_program) { create(:training_program, user: user) }
  let!(:training_plans) { create_list(:training_plan, 2, user: user, training_program: training_program) }
  let(:response_body) { JSON.parse(response.body) }
  let(:training_plan_response) { response_body.first }

  before { login(user) }

  describe 'GET#index' do
    before { get :index, params: { training_program_id: training_program.id } }

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'returns list of training plans' do
      expect(response_body.length).to eq 2
    end

    it 'returns all public fields' do
      %w[id start_time end_time created_at updated_at].each do |attr|
        expect(training_plan_response[attr]).to eq training_plans.first.send(attr).as_json
      end
    end
  end
end
