# frozen_string_literal: true

shared_examples_for 'user is not admin' do
  scenario 'fails to enter admin panel' do
    sign_in(user)
    visit root_path

    expect(page).to_not have_content 'Admin panel'
  end
end
