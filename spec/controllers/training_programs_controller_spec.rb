# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrainingProgramsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:training_programs) { create_list(:training_program, 3, user: user) }
  let!(:exercise) { create(:exercise) }
  let(:training_program) { training_programs.first }
  let(:response_body) { JSON.parse(response.body) }

  before { login(user) }

  describe 'GET #index' do
    before { get :index }

    it 'return 200 status' do
      expect(response).to be_successful
    end

    it 'renders index view' do
      expect(response).to render_template :index
    end

    it 'populates an array of training programs' do
      expect(assigns(:training_programs).length).to equal(training_programs.length)
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      before { post :create, params: { training_program: attributes_for(:training_program) } }

      it 'return 200 status' do
        expect(response).to be_successful
      end

      it 'saves training program in database' do
        expect { post :create, params: { training_program: attributes_for(:training_program) } }
          .to change(TrainingProgram, :count).by(1)
      end

      it 'belongs to user who created it' do
        expect(assigns(:training_program).user_id).to be user.id
      end
    end

    context 'with invalid attributes' do
      before { post :create, params: { training_program: attributes_for(:training_program, :invalid) } }

      it 'return 200 status' do
        expect(response).to be_successful
      end

      it 'returns error list' do
        expect(response_body['errors']).to have_key('title')
      end

      it "doesn't save training program in databse" do
        expect { post :create, params: { training_program: attributes_for(:training_program, :invalid) } }
          .to_not change(TrainingProgram, :count)
      end
    end
  end

  describe 'PUT #update' do
  end

  describe 'DELETE #destroy' do
  end

  describe 'POST #add_exercises' do
    before do
      post :add_exercises,
           params: { id: training_program.id,
                     exercises: [{ exercise_id: exercise.id }] }
    end

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'saves training program exercises in database' do
      expect do
        post :add_exercises,
             params: { id: training_program.id,
                       exercises: [{ exercise_id: exercise.id }] }
      end
        .to change(TrainingProgramExercise, :count).by(1)
    end

    it 'saves exercises in training program' do
      expect do
        post :add_exercises,
              params: { id: training_program.id,
                        exercises: [{ exercise_id: exercise.id }] }
      end
        .to change(training_program.exercises, :count).by(1)
    end
  end

  describe 'DELETE #remove_exercise' do
    let!(:training_program_exercise) do
      create(:training_program_exercise, training_program: training_program, exercise: exercise)
    end

    it 'returns 200 status' do
      delete :remove_exercise, params: { id: training_program.id, exercise_id: training_program_exercise.id }

      expect(response).to be_successful
    end

    it 'deletes training program exercise from database' do
      expect { delete :remove_exercise, params: { id: training_program.id, exercise_id: training_program_exercise.id } }
        .to change(TrainingProgramExercise, :count).by(-1)
    end

    it 'deletes exercise from training program' do
      expect { delete :remove_exercise, params: { id: training_program.id, exercise_id: training_program_exercise.id } }
        .to change(training_program.training_program_exercises, :count).by(-1)
    end

    it 'renders deleted training program exercise with aprropriate fields' do
      delete :remove_exercise, params: { id: training_program.id, exercise_id: training_program_exercise.id }

      %w[exercise_id training_program_id id reps sets].each do |key|
        expect(response_body).to have_key(key)
      end
    end

    it 'renders error' do
      delete :remove_exercise, params: { id: training_program.id, exercise_id: 999 }

      expect(response_body).to have_key('errors')
      expect(response_body['errors'].first).to include('Couldn\'t find TrainingProgramExercise with')
    end

    it 'raises error' do
      expect { delete :remove_exercise, params: { id: 999, exercise_id: training_program_exercise.id } }
        .to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
