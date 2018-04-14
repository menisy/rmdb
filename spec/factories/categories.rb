FactoryBot.define do
  sequence :title do |n|
    "category #{n}"
  end
  factory :category do
    title
  end
end
