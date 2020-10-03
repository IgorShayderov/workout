Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'devised/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'training_programs#index'

  resources :training_programs, only: %i[index create update destroy]

  namespace :api do
    namespace :v1 do
      get ':training_program_id/available_exercises', to:'exercises#available_exercises', as: 'available_exercises'
    end
  end
end
