# frozen_string_literal: true

require 'rails_helper'

feature 'Admin can update existing exercises', "
  In order to change data of existing exercise
  As an admin
  I'd like to be able to update existing exercises
" do
  given!(:user) { create(:user) }
  given!(:admin) { create(:user, admin: true) }
  given!(:exercise) { create(:exercise) }

  describe 'Authenticated user', js: true do
    context 'user is admin' do
      background do
        sign_in(admin)
        visit root_path

        click_link 'Admin panel'

        within "[data-exercise-id='#{exercise.id}']" do
          click_button 'Update'
        end
      end

      scenario 'updates exercise with valid params' do
        fill_in 'Title', with: 'Changed exercise'
        find(:css, '.form-location').choose('Outdoors')
        click_button 'Update exercise'
        
        within '.exercises__list' do
          expect(page).to have_content 'Changed exercise'
        end
      end

      scenario 'fails to update exercise with invalid params' do
        fill_in 'Title', with: ''
        find(:css, '.form-location').choose('Outdoors')
        click_button 'Update exercise'
        
        expect(page).to have_content 'Title can\'t be blank'
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
