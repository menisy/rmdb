Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      # Resources
      resources :ratings do
        collection do
          get 'movies_count'
        end
      end
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
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
end
