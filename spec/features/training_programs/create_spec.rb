require 'rails_helper'

feature 'User can create training program', "
  In order to create program from exercises
  As an authenticated user
  I'd like to be able to create training program
" do
  given(:user) { create(:user) }

  describe 'Authenticated user' do
    background do
      sign_in(user)
      visit root_path
      click_on 'Create new program'
    end

    context 'creates training program' do
      it 'without exercises' do
        fill_in 'Program name', with: 'New program name'
        click_on 'Create'

        expect(page).to have_content 'New program name'
      end

      it 'with several exercises'
    end


  end

  describe 'unathenticated user' do
    
  end
end
