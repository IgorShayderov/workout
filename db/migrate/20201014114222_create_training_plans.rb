class CreateTrainingPlans < ActiveRecord::Migration[6.0]
  def change
    create_table :training_plans do |t|
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.references :training_program, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
