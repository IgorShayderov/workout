# frozen_string_literal: true

FactoryBot.define do
  factory :training_program_exercise do
    training_program
    exercise
    reps { 1 }
    sets { 1 }
  end
end
