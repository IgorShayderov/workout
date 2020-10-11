require 'rails_helper'

feature 'User can add comments to training program', "
  In order to save specific information about training program execution
  As an authenticated user
  I'd like to be able to create comments for training program
" do
  given!(:user) { create(:user) }
  given!(:training_program) { create(:training_program, user: user) }

  describe 'Authenticated user', js: true do
    background do
      sign_in(user)
      visit root_path
    end

    it 'adds valid comment to the training program' do
      find("div.training-program[data-id='#{training_program.id}'] h5.training-program_title").click

      fill_in 'New comment:', with: 'This is comment'
      click_on 'Add comment'

      within '.training-program-comments' do
        expect(page).to have_content 'This is comment'
      end
    end

    it 'adds empty comment to the training program' do
      find("div.training-program[data-id='#{training_program.id}'] h5.training-program_title").click

      fill_in 'New comment:', with: ''
      click_on 'Add comment'

      within '.errors' do
        expect(page).to have_content 'Error'
      end
    end
  end

  describe 'Unauthenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthencicated user'
  end
end