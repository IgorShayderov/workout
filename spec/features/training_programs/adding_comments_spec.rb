# frozen_string_literal: true

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

    scenario 'adds valid comment to the training program' do
      find("div.training-program[data-id='#{training_program.id}'] h5.training-program__title").click

      click_on 'Add new comment'
      fill_in 'New comment:', with: 'This is comment'
      click_on 'Add comment'

      within '.training-program-comments' do
        expect(page).to have_content 'This is comment'
      end
    end

    scenario 'adds empty comment to the training program' do
      find("div.training-program[data-id='#{training_program.id}'] h5.training-program__title").click

      click_on 'Add new comment'
      fill_in 'New comment:', with: ''
      click_on 'Add comment'

      within '.errors-viewer' do
        expect(page).to have_content "Body can't be blank"
      end
    end
  end

  describe 'Unauthenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthenticated user'
  end
end
