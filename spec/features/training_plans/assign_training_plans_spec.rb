require 'rails_helper'

feature  'User can observe his training plans', "
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
    end

    it 'assigns his training plans' do
      click_link 'Calendar'
      find(".calendar__day[data-count='14']").click
      click_on 'Add training plan'
      select 'First program', from: 'Training program:'
      fill_in 'Start time:', with: '15:00'
      fill_in 'End time:', with: '16:00'
      click_on 'Assign training plan'

      within '.calendar-day__training-plans' do
        expect(page).to have_content 'First program'
      end
    end
  end
end
