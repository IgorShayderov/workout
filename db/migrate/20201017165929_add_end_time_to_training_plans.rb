class AddEndTimeToTrainingPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :training_plans, :end_time, :date, null: false
  end
end
