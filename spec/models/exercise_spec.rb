# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Exercise, type: :model do
  let!(:exercise) { create(:exercise) }

  it { should have_many(:training_program_exercises) }
  it { should have_many(:training_programs).through(:training_program_exercises).dependent(:destroy) }

  describe 'attachment' do
    let!(:new_exercise) { create(:exercise) }

    it 'have one attached image' do
      expect(Exercise.new.image).to be_an_instance_of(ActiveStorage::Attached::One)
    end

    it 'destroy attached image' do
      new_exercise.image.attach(create_file_blob)

      expect { new_exercise.destroy }.to change(Exercise.joins(:image_attachment), :count)
    end
  end

  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title) }

  let(:training_program) { create(:training_program, location: 'outdoors') }
  let(:first_exercise) { create(:exercise) }
  let(:second_exercise) { create(:exercise) }

  describe '.created_exercises' do
    let(:first_training_exercise) do
      create(:training_program_exercise, training_program: training_program, exercise: first_exercise)
    end

    it 'should include created exercise' do
      expect(Exercise.created_exercises(training_program.id, [first_training_exercise.id]).first)
        .to include('id' => first_exercise.id)
    end

    it 'should not include non-created exercise' do
      expect(Exercise.created_exercises(training_program.id, [first_training_exercise.id]).first)
        .to_not include('id' => second_exercise.id)
    end

    it 'should be hash' do
      expect(Exercise.created_exercises(training_program.id, [first_training_exercise.id]).first)
        .to be_instance_of(Hash)
    end
  end

  describe '.all_with_images' do
    # TODO написать тест на order
    let!(:exercise_with_image) { create(:exercise, title: 'Exercise with image') }
    before { exercise_with_image.image.attach(create_file_blob) }

    it 'should return exercises with images' do
      created_exercise = Exercise.all_with_images.find { |exercise| exercise['title'] == 'Exercise with image' }

      expect(created_exercise).to have_key(:image)
    end

    it 'should not include image key when image is not attached' do
      existing_exercise = Exercise.all_with_images.find { |exercise| exercise['title'] != 'Exercise with image' }

      expect(existing_exercise).to_not have_key(:image)
    end
  end
end
