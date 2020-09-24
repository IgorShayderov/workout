FactoryBot.define do
  factory :training_program do
    title { 'Training program title' }
    user

    trait :invalid do
      title { nil }
    end
  end
end
