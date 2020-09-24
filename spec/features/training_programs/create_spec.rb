require 'rails_helper'

feature 'User can create training program', "
  In order to create program from exercises
  As an authenticated user
  I'd like to be able to create training program
" do
  given(:user) { create(:user) }

  describe 'Authenticated user', js: true do
    background do
      sign_in(user)
      visit root_path
      # save_and_open_page
      click_on 'Create new program'
    end

    context 'creates training program' do
      it 'without exercises' do
        fill_in 'Title', with: 'New program title'
        click_on 'Create'

        expect(page).to have_content 'New program title'
      end

      it 'with several exercises'
    end


  end

  describe 'unathenticated user' do
    
  end
end
