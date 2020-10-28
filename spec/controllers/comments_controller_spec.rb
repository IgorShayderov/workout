# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:training_program) { create(:training_program, user: user) }
  let!(:comments) { create_list(:comment, 2, training_program: training_program, user: user) }

  before { login(user) }

  describe 'GET #index' do
    before { get :index, params: { training_program_id: training_program.id } }

    it 'return 200 status' do
      expect(response).to be_successful
    end

    it 'populates array of comments' do
      expect(assigns(:comments)).to match_array(comments)
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      before { post :create, params: { comment: attributes_for(:comment), training_program_id: training_program.id } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'saves comment in database' do
        expect { post :create, params: { comment: attributes_for(:comment), training_program_id: training_program.id } }
          .to change(Comment, :count).by(1)
      end
    end

    context 'with invalid attributes' do
      before { post :create, params: { comment: attributes_for(:comment, :invalid), training_program_id: training_program.id } }

      it 'returns 200 status' do
        expect(response).to be_successful
      end

      it 'does not save comment in database' do
        expect { post :create, params: { comment: attributes_for(:comment, :invalid), training_program_id: training_program.id } }
          .to_not change(Comment, :count)
      end

      it 'returns list of errors' do
        expect(JSON.parse(response.body)['errors']).to have_key('body')
      end
    end
  end
end
