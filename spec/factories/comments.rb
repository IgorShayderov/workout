FactoryBot.define do
  factory :comment do
    body { "Comment body" }
    user
    training_program

    trait :invalid do
      body { nil }
    end
  end
end
