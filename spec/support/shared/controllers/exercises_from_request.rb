# frozen_string_literal: true

shared_examples_for 'exercises from request' do
  it 'returns 200 status' do
    expect(response).to be_successful
  end

  it 'returns all public fields' do
    %w[id title].each do |attr|
      expect(exercise_response[attr]).to eq exercises.first.send(attr).as_json
    end
  end
end
