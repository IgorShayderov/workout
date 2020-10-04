Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'devised/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'training_programs#index'

  resources :training_programs, only: %i[index create update destroy]

  scope '/exercises' do
    get ':training_program_id/available_exercises',
        to: 'exercises#available_exercises',
        as: 'available_exercises'
    get ':training_program_id/training_program_exercises',
        to:'exercises#training_program_exercises',
        as: 'training_program_exercises'
  end

end
