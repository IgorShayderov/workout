FactoryBot.define do
  factory :training_program_exercise do
    training_program
    exercise
    count { 1 }
  end
end
