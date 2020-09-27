require 'rails_helper'

RSpec.describe TrainingProgramExercise, type: :model do
  it { should belong_to(:exercise) }
  it { should belong_to(:training_program) }
end
