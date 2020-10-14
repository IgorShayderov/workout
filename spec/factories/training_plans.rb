FactoryBot.define do
  factory :training_plan do
    day { "2020-10-14" }
    user
    training_program
  end
end
