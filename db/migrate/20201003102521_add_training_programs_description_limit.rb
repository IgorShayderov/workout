class AddTrainingProgramsDescriptionLimit < ActiveRecord::Migration[6.0]
  def change
    change_column :training_programs, :description, :string, limit: 250
  end
end
