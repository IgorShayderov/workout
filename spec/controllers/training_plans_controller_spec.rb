# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrainingPlansController, type: :controller do
  let!(:user) { create(:user) }
  let!(:training_program) { create(:training_program, user: user) }
  let!(:training_plans) { create_list(:training_plan, 2, user: user, training_program: training_program) }
  let(:response_body) { JSON.parse(response.body) }
  let(:training_plan_response) { response_body.first }

  before { login(user) }

  describe 'GET#index' do
    let!(:date) { training_program.created_at }

    before { get :index, params: { year: date.year, month: date.month, day: date.day } }

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

  describe 'POST#create' do
    context 'with valid attributes' do
      before { post :create, params: { training_program_id: training_program.id, training_plan: attributes_for(:training_plan) } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'saves training program in database' do
        expect { post :create, params: { training_program_id: training_program.id, training_plan: attributes_for(:training_plan) } }
          .to change(TrainingPlan, :count).by(1)
      end

      it 'belongs to training_program from which it was createded' do
        expect(assigns(:training_plan).training_program_id).to be training_program.id
      end
    end

    context 'with invalid attributes' do
      before do
        post :create, params: { training_program_id: training_program.id, training_plan: attributes_for(:training_plan, :invalid) }
      end

      it 'return 200 status' do
        expect(response).to be_successful
      end

      it 'returns error list' do
        expect(JSON.parse(response.body)['errors']).to have_key('start_time')
      end

      it "doesn't save training program in databse" do
        expect do
          post :create, params: {
            training_program_id: training_program.id,
            training_plan: attributes_for(:training_plan, :invalid)
          }
        end
          .to_not change(TrainingPlan, :count)
      end
    end
  end
end
