require 'rails_helper'

feature 'User can create training program', "
  In order to create program from exercises
  As an authenticated user
  I'd like to be able to create training program
" do
  given!(:user) { create(:user) }

  describe 'Authenticated user', js: true do
    background do
      sign_in(user)
      visit root_path
      click_link 'Make new program'
    end

    context 'tries to create training program' do
      it 'with valid attributes' do
        fill_in 'Title', with: 'New program title'
        fill_in 'Description', with: 'Training program description'
        find(:css, '.training-program-form').choose('Outdoors')
        click_on 'Create'

        expect(page).to have_content 'New program title'
      end

      it 'with invalid attributes' do
        find(:css, '.training-program-form').choose('Outdoors')
        click_on 'Create'

        within '.training-program-form .errors-viewer_errors' do
          expect(page).to have_content 'Title'
          expect(page).to have_content "can't be blank"
        end
      end
    end
  end

  describe 'Unathenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthencicated user'
  end
end
