require 'rails_helper'

RSpec.describe TrainingProgramsController, type: :controller do
  let!(:user) { create(:user) }
  let(:training_programs) { create_list(:training_program, 3, user: user) }

  before { login(user) }
  
  describe 'GET #index' do
    before { get :index }

    it 'renders index view' do
      expect(response).to render_template :index
    end
    
    it 'populates an array of training programs' do
      expect(assigns(:training_programs)).to match_array(training_programs)
    end
  end

  describe 'POST #create' do
    before { post :create, params: { training_program: attributes_for(:training_program) } }

    context 'with valid attributes' do
      it 'saves training program in database' do
        expect { post :create, params: { training_program: attributes_for(:training_program) } }
        .to change(TrainingProgram, :count).by(1)
      end

      it 'belongs to user who created it' do
        expect(assigns(:training_program).user_id).to be user.id
      end

      it 'response to have status 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'with invalid attributes' do
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
end
