# frozen_string_literal: true

require 'rails_helper'

feature 'Admin can observe all existing exercises', "
  In order to observe existing exercises, their titles, locations, images
  As an admin
  I'd like to be able to obserse all existing exercises
" do
  given!(:user) { create(:user) }
  given!(:admin) { create(:user, admin: true) }
  before { create(:exercise, title: 'The exercise') }

  describe 'Authenticated user', js: true do
    context 'user is admin' do
      scenario 'observe all created exercises' do
        sign_in(admin)
        visit root_path

        click_link 'Admin panel'

        expect(page).to have_content 'Admin panel'
        expect(page).to have_content 'The exercise'
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
