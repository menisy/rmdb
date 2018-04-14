Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ratings
      resources :users
      resources :movies
      resources :categories
    end
  end
end
