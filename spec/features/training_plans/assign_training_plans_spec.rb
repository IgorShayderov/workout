# frozen_string_literal: true

require 'rails_helper'

feature 'User can observe his training plans', "
  In order to plan my training
  As an authenticated user
  I should be able to assign training_program to certain date
" do
  given!(:user) { create(:user) }
  given!(:training_program) { create(:training_program, title: 'First program', user: user) }

  describe 'Authenticated user', js: true do
    background do
      sign_in(user)
      visit root_path

      click_link 'Calendar'
      find(".calendar__day[data-count='14']").click
      click_on 'Add training plan'
    end

    scenario 'assigns training plan with valid params' do
      select 'First program', from: 'Training program:'
      fill_in 'Start time:', with: Time.zone.local(2020, 10, 5, 14, 0o0)
      fill_in 'End time:', with: Time.zone.local(2020, 10, 5, 14, 30)

      click_on 'Assign training plan'

      within '.calendar-day__training-plans' do
        expect(page).to have_content 'First program'
      end
    end

    scenario 'assigns training plan without end time' do
      select 'First program', from: 'Training program:'
      fill_in 'Start time:', with: Time.zone.local(2020, 10, 5, 14, 0o0)

      click_on 'Assign training plan'

      within '.errors-viewer' do
        expect(page).to have_content "End time can't be blank"
      end
    end

    scenario 'tries to assigns training plan without training program' do
      click_on 'Assign training plan'

      within '.errors-viewer' do
        expect(page).to have_content "Training program can't be blank"
      end
    end
  end

  describe 'Unauthenticated user' do
    background { visit root_path }

    it_behaves_like 'unauthencicated user'
  end
end
