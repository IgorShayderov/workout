# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrainingPlan, type: :model do
  it { should belong_to(:training_program) }
  it { should belong_to(:user) }

  it { should validate_presence_of(:start_time) }
  it { should validate_presence_of(:end_time) }

  describe '.plans_for_date' do
    let!(:user) { create(:user) }
    let!(:training_program) { create(:training_program, user: user) }
    let(:date) { DateTime.new(2020, 10, 17, 12, 0) }
    let(:first_training_plan) do
      create(:training_plan, training_program: training_program,
                             user: user,
                             start_time: date,
                             end_time: date + 1.hour)
    end
    let(:second_training_plan) do
      create(:training_plan, training_program: training_program,
                             user: user,
                             start_time: date + 1.day,
                             end_time: date + 1.day + 1.hour)
    end

    it 'should returns exercise with appropriate date' do
      expect(TrainingPlan.plans_for_date(date)).to include(first_training_plan)
    end

    it 'should not returns exercise with inappropriate date' do
      expect(TrainingPlan.plans_for_date(date)).to_not include(second_training_plan)
    end
  end
end
