# frozen_string_literal: true

FactoryBot.define do
  factory :exercise do
    location { 'gym' }
    sequence(:title) { |n| "Exercise ##{n}" }

    trait :invalid do
      title { nil }
    end
  end
end
