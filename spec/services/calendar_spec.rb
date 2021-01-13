require 'rails_helper'

RSpec.describe Calendar do
  describe '#collect_calendar_data' do
    let!(:calendar_data) { Calendar.instance.collect_calendar_data }

    it 'should return hash with data' do
      expect(calendar_data).to be_kind_of(Hash)
    end

    it 'should return caption' do
      expect(calendar_data[:caption]).to be_kind_of(String)
    end

    it 'should return days' do
      expect(calendar_data[:days]).to be_kind_of(Array)
      expect(calendar_data[:days].first).to be_kind_of(Hash)
      expect(calendar_data[:days].length).to be_between(28, 42)
    end

    it 'should return weeks count' do
      expect(calendar_data[:weeks_count]).to be_kind_of(Integer)
    end
  end

  describe '#count_weeks' do
    test_values = [
      { all_days: (1..28).to_a, expected: 4 },
      { all_days: (1..35).to_a, expected: 5 },
      { all_days: (1..42).to_a, expected: 6 },
    ]

    test_values.each do |test_hash|
      it 'should return weeks count' do
        Calendar.instance.instance_variable_set("@#{test_hash.keys.first}".to_sym, test_hash[:all_days])

        expect(Calendar.instance.send('count_weeks')).to equal(test_hash[:expected])
      end
    end
  end

# TODO
  describe '.calendar_representation_days' do
    let!(:calendar) { spy('Calendar.instance') }

    before do
      # TrainingPlan.remove_instance_variable(:current_date)
    end

    it 'add_month_days with :prev should be called' do
      # Calendar.instance.send('calendar_representation_days')
      # expect(TrainingPlan.send('calendar_representation_days')).to be(true)
      # expect(calendar).to have_received(:add_month_days)
    end

    it 'add_month_days with :next should be called' do
      # expect(TrainingPlan.send('calendar_representation_days')).to be(true)
    end
  end

  describe '.add_month_days' do
    
  end
end
