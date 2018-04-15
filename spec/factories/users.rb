FactoryBot.define do
  sequence :username do |n|
    "username#{n}"
  end

  sequence :email do |n|
    "user#{n}@gmail.com"
  end
  factory :user do
    email
    username
    password "123456"
    password_confirmation "123456"
  end
end
