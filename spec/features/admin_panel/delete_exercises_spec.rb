# frozen_string_literal: true
# TODO delete attached image

require 'rails_helper'

feature 'Admin can delete exercises', "
  In order to get rid of unnecessary exercises
  As an admin
  I'd like to be able to delete exercises
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
      end

      scenario 'deletes existing exercise' do
        within "[data-exercise-id='#{exercise.id}']" do
          click_button 'Delete'
        end

        page.driver.browser.switch_to.alert.accept

        expect(page).to_not have_content(exercise.title)
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
