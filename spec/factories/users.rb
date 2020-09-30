FactoryBot.define do
  sequence :email do |n|
    "test#{n}@gmail.com"
  end

  factory :user do
    email
    password { '123456789' }
    password_confirmation { '123456789' }
  end
end
