FactoryBot.define do
  factory :training_program_exercise do
    training_program
    exercise
    count { 0 }
  end
end
