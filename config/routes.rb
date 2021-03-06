# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'devised/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'training_programs#index'

  resources :training_programs, only: %i[index create update destroy] do
    post 'add_exercises', on: :member
    delete 'remove_exercise/:exercise_id', action: :remove_exercise, on: :member

    resources :comments, shallow: true, only: %i[index create]
    resources :training_plans, only: %i[create]
  end

  resources :exercises, only: %i[index create update destroy]
  resources :attachments, only: %i[destroy]

  get 'calendar_rendering_data', to: 'training_plans#calendar_rendering_data'

  get '/:year/:month/:day/training_plans',
      to: 'training_plans#index'

  get '/is_admin', to: 'profiles#admin?'

  # for vue-router historyApi
  get '/*path', to: 'training_programs#index',
                constraints: ->(request) { !request.fullpath.include?('rails/active_storage') }
end
