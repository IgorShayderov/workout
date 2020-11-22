# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_30_132539) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "body", limit: 180, null: false
    t.bigint "user_id", null: false
    t.bigint "training_program_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["training_program_id"], name: "index_comments_on_training_program_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "exercises", force: :cascade do |t|
    t.string "location", null: false
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "training_plans", force: :cascade do |t|
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.bigint "training_program_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["training_program_id"], name: "index_training_plans_on_training_program_id"
    t.index ["user_id"], name: "index_training_plans_on_user_id"
  end

  create_table "training_program_exercises", force: :cascade do |t|
    t.bigint "exercise_id", null: false
    t.bigint "training_program_id", null: false
    t.integer "reps", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sets", default: 1
    t.index ["exercise_id"], name: "index_training_program_exercises_on_exercise_id"
    t.index ["training_program_id"], name: "index_training_program_exercises_on_training_program_id"
  end

  create_table "training_programs", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.string "description", limit: 250, default: ""
    t.string "location", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_training_programs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name", limit: 20, null: false
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "training_programs"
  add_foreign_key "comments", "users"
  add_foreign_key "training_plans", "training_programs"
  add_foreign_key "training_plans", "users"
  add_foreign_key "training_program_exercises", "exercises"
  add_foreign_key "training_program_exercises", "training_programs"
  add_foreign_key "training_programs", "users"
end
