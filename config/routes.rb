Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :api do
    namespace :v1 do
      # Resources
      resources :ratings
      resources :users do
        collection do
          get 'me'
        end
      end
      resources :movies do
        collection do
          get 'user_movies'
        end
      end
      resources :categories

      # Authentication
      post 'user_token' => 'user_token#create'
    end
  end
end
