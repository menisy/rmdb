Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :api do
    namespace :v1 do
      # Resources
      resources :ratings
      resources :users
      resources :movies
      resources :categories

      # Authentication
      post 'user_token' => 'user_token#create'
    end
  end
end
