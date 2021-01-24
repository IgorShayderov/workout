# frozen_string_literal: true

FactoryBot::SyntaxRunner.class_eval do
  include ActionDispatch::TestProcess
end

FactoryBot.define do
  factory :exercise do
    sequence(:title) { |n| "Exercise ##{n}" }

    trait :invalid do
      title { nil }
    end

    trait :with_image do
      image { fixture_file_upload(Rails.root.join('public', 'apple-touch-icon.png'), 'image/png') }
    end
  end
end
