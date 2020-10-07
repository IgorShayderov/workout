Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'devised/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'training_programs#index'

  resources :training_programs, only: %i[index create update destroy] do

    # member do
    #   get :available_exercises
    # end

    # resources :exercises, only: %i[index create], shallow: true do
    #   member do
    #     get ':training_program_id/available_exercises',
    #       to: 'exercises#available',
    #       as: 'available_exercises'
    #   end
    # end
  end

  scope '/exercises' do
    get ':training_program_id/available_exercises',
        to: 'exercises#available_exercises',
        as: 'available_exercises'

    get ':training_program_id/training_program_exercises',
        to:'exercises#training_program_exercises',
        as: 'training_program_exercises'

    post ':training_program_id/save_exercises',
          to: 'exercises#save_exercises',
          as: 'save_exercises'
  end
end
