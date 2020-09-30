require 'rails_helper'

feature 'User can add exercises to training program', "
  In order to write exercises which I want to perform
  As an authenticated user
  I'd like to be able to write exercises to training program
" do
  given!(:user) { create(:user) }
  given(:training_program) { create(:training_program, title: 'Program for test') }

  describe 'Athenticated user', js: true do
    background do
      sign_in(user)
      visit root_path
    end

    it 'adds exercise to program' do
      click_on 'Program for test'
      click_on 'add exercise'
      click on 'close form'

      within '.training_programs' do
        expect(page).to have_content('1 exercise')
      end
    end
  end

  describe 'Unauthenticated user', js: true do

  end
end
