FactoryBot.define do
  factory :training_plan do
    start_time { Time.now }
    end_time { 30.minutes.from_now }
    user
    training_program
  end

  trait :invalid do
    start_time { nil }
    end_time { nil }
  end
end

