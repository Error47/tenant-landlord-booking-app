# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_26_085339) do

  create_table "amenities", charset: "latin1", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.integer "bedroom_count"
    t.float "bathroom_count"
    t.string "house_area"
    t.string "floor_no"
    t.integer "lift"
    t.integer "pet_friendly"
    t.integer "garage"
    t.string "apartment"
    t.datetime "free_when"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_amenities_on_property_id"
  end

  create_table "properties", charset: "latin1", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.string "address_1"
    t.string "address_2"
    t.string "email"
    t.string "contact"
    t.string "post_code"
    t.float "latitude"
    t.float "longitude"
    t.string "neighbourhood"
    t.string "location"
    t.string "image_url"
    t.datetime "rented_date"
    t.integer "is_searchable"
    t.integer "status"
    t.integer "for_rent"
    t.integer "for_sell"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_properties_on_user_id"
  end

  create_table "property_types", charset: "latin1", force: :cascade do |t|
    t.integer "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rent_details", charset: "latin1", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.integer "state_of_property"
    t.integer "contract_intial_length"
    t.integer "break_clause"
    t.integer "security_deposite"
    t.integer "period_split"
    t.integer "rent_per_month"
    t.float "percent_increase"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_rent_details_on_property_id"
  end

  create_table "reserved_slots", charset: "latin1", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.bigint "user_id", null: false
    t.bigint "slot_id", null: false
    t.bigint "recipient_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_reserved_slots_on_property_id"
    t.index ["recipient_id"], name: "index_reserved_slots_on_recipient_id"
    t.index ["slot_id"], name: "index_reserved_slots_on_slot_id"
    t.index ["user_id"], name: "index_reserved_slots_on_user_id"
  end

  create_table "slots", charset: "latin1", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.integer "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_slots_on_property_id"
  end

  create_table "users", charset: "latin1", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.string "phone_number"
    t.integer "role"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "amenities", "properties"
  add_foreign_key "properties", "users"
  add_foreign_key "rent_details", "properties"
  add_foreign_key "reserved_slots", "properties"
  add_foreign_key "reserved_slots", "slots"
  add_foreign_key "reserved_slots", "users"
  add_foreign_key "reserved_slots", "users", column: "recipient_id"
  add_foreign_key "slots", "properties"
end
