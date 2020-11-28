# frozen_string_literal: true

require 'rails_helper'

feature 'Admin can update existing exercises', "
  In order to change data of existing exercise
  As an admin
  I'd like to be able to update existing exercises
" do
  given!(:user) { create(:user) }
  given!(:admin) { create(:user, admin: true) }

  describe 'Authenticated user', js: true do
    context 'user is admin' do
      background do
        sign_in(admin)
        visit root_path
        click_link 'Admin panel'
        click_link 'Add exercise'
      end

      scenario 'updates exercise with valid params' do
        
      end

      scenario 'fails to update exercise with invalid params' do
        
      end
    end

    context 'user is not admin' do
      it_behaves_like 'user is not admin'
    end
  end

  describe 'Unathenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthencicated user'
  end
end
