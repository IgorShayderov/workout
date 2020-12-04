# frozen_string_literal: true

require 'rails_helper'

feature 'Admin can create new exercises', "
  In order to extend current exercises lsit
  As an admin
  I'd like to be able to create new exercises
" do
  given!(:user) { create(:user) }
  given!(:admin) { create(:user, admin: true) }

  describe 'Authenticated user', js: true do
    context 'user is admin' do
      background do
        sign_in(admin)
        visit root_path
        click_link 'Admin panel'
        click_button 'Add exercise'
      end

      scenario 'creates exercise with valid params' do
        fill_in 'Title', with: 'The exercise'
        find(:css, '.form-location').choose('Outdoors')
        click_button 'Create exercise'

        within '.exercises__list' do
          expect(page).to have_content 'The exercise'
        end
      end

      scenario 'creates exercise with invalid params' do
        fill_in 'Title', with: ''
        find(:css, '.form-location').choose('Outdoors')
        click_button 'Create exercise'

        expect(page).to have_content 'Title can\'t be blank'
      end
    end

    context 'user is not admin' do
      it_behaves_like 'user is not admin'
    end
  end

  describe 'Unathenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthenticated user'
  end
end
