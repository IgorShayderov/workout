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

    it 'returns list of available exercises' do
      expect(response_body.length).to eq 3
    end

    it_behaves_like 'exercises from request'
  end

  describe 'GET #index' do
    context 'with params' do
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

    context 'without params' do
      before { get :index }

      it_behaves_like 'exercises from request'

      it 'returns list of all exercises' do
        expect(response_body.length).to eq exercises.length
      end
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      before { post :create, params: { exercise: attributes_for(:exercise) } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'saves exercise in database' do
        expect { post :create, params: { exercise: attributes_for(:exercise) } }
          .to change(Exercise, :count).by(1)
      end
    end

    context 'with invalid params' do
      before { post :create, params: { exercise: attributes_for(:exercise, :invalid) } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'does not save exercise in database' do
        expect { post :create, params: { exercise: attributes_for(:exercise, :invalid) } }
          .to_not change(Exercise, :count)
      end

      it 'returns error list' do
        expect(response_body['errors']).to have_key('title')
      end
    end
  end

  describe 'PATCH #update' do
    let!(:exercise) { create(:exercise) }

    context 'with valid params' do
      before { patch :update, params: { id: exercise.id, exercise: { title: 'Changed title' } } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'saved new title' do
        expect(response_body['title']).to eq('Changed title')
      end
    end

    context 'with invalid params' do
      before { patch :update, params: { id: exercise.id, exercise: { title: '' } } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'returns error list' do
        expect(response_body['errors']).to have_key('title')
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:exercise) { create(:exercise) }

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'deletes exercise from database' do
      expect { delete :destroy, params: { id: exercise.id } }
        .to change(Exercise, :count).by(-1)
    end
  end
end
