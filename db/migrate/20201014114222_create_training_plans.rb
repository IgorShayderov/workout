class CreateTrainingPlans < ActiveRecord::Migration[6.0]
  def change
    create_table :training_plans do |t|
      t.date :day, null: false
      t.references :training_program, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
