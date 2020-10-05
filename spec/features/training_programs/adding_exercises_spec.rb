require 'rails_helper'

feature 'User can add exercises to training program', "
  In order to write exercises which I want to perform
  As an authenticated user
  I'd like to be able to write exercises to training program
" do
  given!(:user) { create(:user) }
  given!(:training_program) { create(:training_program, user: user, title: 'Program for test') }
  given!(:exercise) { create(:exercise, title: 'Pull ups') }

  describe 'Athenticated user', js: true do
    background do
      sign_in(user)
      visit root_path
    end

    it 'adds exercise to program' do
      find("div.training-program[data-id='#{training_program.id}'] h5.training-program_title").click
      find("div.training-program-exercise[data-id='#{training_program.id}']").click
      click_on 'Confirm'

      within '.program-exercises' do
        expect(page).to have_content('Pull ups')
      end
    end
  end

  describe 'Unauthenticated user', js: true do
    background { visit root_path }

    it 'redicted to sign in path' do
      expect(page).to have_content 'Log in'
    end
  end
end
