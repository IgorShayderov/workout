Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'devised/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'training_programs#index'

  resources :training_programs, only: %i[index create update destroy] do

    get 'training_program_exercises',
      to: 'exercises#training_program_exercises',
      as: 'training_program_exercises'

    get 'available_exercises',
      to: 'exercises#available_exercises',
      as: 'available_exercises'

    post 'save_exercises',
      to: 'exercises#save_exercises',
      as: 'save_exercises'

    resources :comments, shallow: true, only: %i[index create]
  end

  resources :training_plans, only: %i[create]

  get '/:year/:month/:day/training_plans',
    to: 'training_plans#index'

  # for vue-router historyApi
  get '/*path', to: 'training_programs#index' 
end
