# frozen_string_literal: true

require 'rails_helper'

feature 'Admin can search through list of exercises', "
  In order to search certain exercise,
  As an admin
  I'd like to be able to search exercises
" do
  given!(:user) { create(:user) }
  given!(:admin) { create(:user, admin: true) }

  before do
    create(:exercise, title: 'Exercise you want to see')
    create(:exercise, title: 'Exercise you don\'t want to see')
  end

  describe 'Authenticated user', js: true do
    context 'user is admin' do
      scenario 'can search through exercises' do
        sign_in(admin)
        visit root_path

        click_link 'Admin panel'

        expect(page).to have_content 'Admin panel'

        fill_in with: 'Exercise you want to see', placeholder: 'Search exercises...'

        expect(page).to have_content 'Exercise you want to see'
        expect(page).to_not have_content 'Exercise you don\'t want to see'
      end
    end

    context 'user is not admin' do
      it_behaves_like 'user is not admin'
    end
  end

  describe 'Unauthenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthenticated user'
  end
end
