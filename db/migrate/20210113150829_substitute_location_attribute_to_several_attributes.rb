class SubstituteLocationAttributeToSeveralAttributes < ActiveRecord::Migration[6.0]
  def change
    remove_column :exercises, :location, :string
  end
end
