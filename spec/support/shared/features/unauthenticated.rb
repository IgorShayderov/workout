# frozen_string_literal: true

shared_examples_for 'unauthenticated user' do
  scenario 'redicted to sign in path' do
    expect(page).to have_content 'Log in'
    expect(page).to have_content 'Sign up'
  end
end
