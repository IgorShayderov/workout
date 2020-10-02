FactoryBot.define do
  factory :training_program do
    sequence(:title) { |n| "Training program # #{n}" }
    user
    location { 'gym' }

    trait :invalid do
      title { nil }
    end

    factory :training_program_with_exercises do
      transient do
        exercises_count { 3 }
      end

      after(:create) do |training_program, evaluator|
        create_list(:training_program_exercise, evaluator.exercises_count, training_program: training_program)
        training_program.reload
      end
    end
  end
end
