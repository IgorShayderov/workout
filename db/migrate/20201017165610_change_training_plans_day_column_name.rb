class ChangeTrainingPlansDayColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :training_plans, :day, :start_time
  end
end
