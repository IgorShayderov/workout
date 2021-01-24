# frozen_string_literal: true

require 'rails_helper'

feature 'User can delete exercises from training program', "
  In order to delete unnecessary exercises from training program
  As an authenticated user
  I'd like to be able to remove exercises
" do
  given!(:user) { create(:user) }
  given!(:training_program) { create(:training_program, user: user) }
  given!(:exercise) { create(:exercise) }

  background do
    create(:training_program_exercise, training_program: training_program, exercise: exercise)
  end

  describe 'Authenticated user', js: true do
    background do
      sign_in(user)
      visit root_path
    end

    scenario 'deletes exercise from training program' do
      find("div.training-program[data-id='#{training_program.id}'] h5.training-program__title").click

      within ".program-exercises .program-exercises__list-item[data-test-id=\'#{exercise.id}\']" do
        find(".program-exercises__delete-item").click
      end

      within '.program-exercises' do
        expect(page).to_not have_content("#{exercise.title}")
      end
    end
  end

  describe 'Unauthenticated user' do
    background { visit root_path }

    scenario 'redirected to sign in path' do
      expect(page).to have_content('Log in')
      expect(page).to have_content('Sign up')
    end
  end
end