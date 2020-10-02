# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Exercise.create!([
  { title: 'Pull ups', location: 'outdoors' },
  { title: 'Dips', location: 'outdoors' },
  { title: 'Push ups', location: 'outdoors' },
  { title: 'Bar leg raises', location: 'outdoors' },
  { title: 'Jumping with legs switching', location: 'outdoors' },
  { title: 'Bench press', location: 'gym' },
  { title: 'Deadlift', location: 'gym' },
  { title: 'Barbell hip bridge', location: 'gym' },
  { title: 'Squats', location: 'gym' },
  { title: 'Lat-pulldowns', location: 'gym' },
  { title: 'Barbell Bbicep Curls', location: 'gym' },
  { title: 'Overhead press', location: 'gym' }
]);
