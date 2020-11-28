# frozen_string_literal: true

require 'rails_helper'

feature 'Admin can delete exercises', "
  In order to get rid of unnecessary exercises
  As an admin
  I'd like to be able to delete exercises
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

      scenario 'deletes existing exercise' do
        
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
