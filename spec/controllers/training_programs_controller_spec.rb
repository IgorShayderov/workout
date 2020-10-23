require 'rails_helper'

RSpec.describe TrainingProgramsController, type: :controller do
  let!(:user) { create(:user) }
  let(:training_programs) { create_list(:training_program, 3, user: user) }
  let!(:exercises) { create_list(:exercise, 3) }
  let(:training_program) { training_programs.first }

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
      expect(assigns(:training_programs)).to match_array(training_programs)
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
        expect(JSON.parse(response.body)['errors']).to have_key('title')
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
                      exercises: [{ exercise_id: exercises.first.id ,count: 0}] }
    end 

    it 'returns 200 status' do
      expect(response).to be_successful
    end

    it 'saves exercises in database' do
      expect { post :add_exercises,
              params: { id: training_program.id,
                        exercises: [{ exercise_id: exercises.first.id ,count: 0}] } }
      .to change(TrainingProgramExercise, :count).by(1)
    end
  end
end
