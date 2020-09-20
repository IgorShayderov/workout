require 'rails_helper'

RSpec.describe TrainingProgramsController, type: :controller do
  describe 'GET #index' do
    before { get :index }

    it 'renders index view' do
      expect(response).to render_template :index
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'saves training program in database' do
        expect { post :create, params: { training_program: attributes_for(:training_program) } }
        .to change(TrainingProgram, :count).by(1)
      end

      it 'belongs to user who created it' do
        post :create, params: { training_program: attributes_for(:training_program) }

        expect(assigns(:training_program).user_id).to be user.id
      end
    end

    context 'with invalid attributes' do
      it "doesn't save training program in databse" do
        expect { post :create, params: { training_program: attributes_for(:training_program) } }
        .to_not change(TrainingProgram, :count)
      end
    end
  end

  describe 'PUT #update' do

  end

  describe 'DELETE #destroy' do
    
  end
end
