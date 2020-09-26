FactoryBot.define do
  sequence :title do |n|
    "Training program # #{n}"
  end

  factory :training_program do
    title
    user

    trait :invalid do
      title { nil }
    end
  end
end
