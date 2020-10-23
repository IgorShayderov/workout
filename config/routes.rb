Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'devised/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'training_programs#index'

  resources :training_programs, only: %i[index create update destroy] do

    post 'add_exercises', on: :member

    resources :exercises, only: %i[index] do
      get 'available', on: :collection
    end

    resources :comments, shallow: true, only: %i[index create]
    resources :training_plans, only: %i[create]
  end

  resources :exercises

  get '/:year/:month/:day/training_plans',
    to: 'training_plans#index'

  # for vue-router historyApi
  get '/*path', to: 'training_programs#index' 
end
