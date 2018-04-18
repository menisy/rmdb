FactoryBot.define do
  sequence :nickname do |n|
    "nickname#{n}"
  end

  sequence :email do |n|
    "user#{n}@gmail.com"
  end
  factory :user do
    email
    nickname
    password "123456"
    password_confirmation "123456"
  end
end
