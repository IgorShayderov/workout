# frozen_string_literal: true

FactoryBot.define do
  factory :exercise do
    location { 'gym' }
    sequence(:title) { |n| "person#{n}@example.com" }
  end
end
