import actions from 'store/training_programs/training_programs_actions';
import axios from 'axios';

jest.mock('axios', () => jest.fn());

const rootGetters = {};

describe('vuex training programs module actions', () => {
  describe('loadCalendarData', () => {
    test('sucessfully loads calendar data', () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'data' }));
      const expected = 'data';

      expect.assertions(1);
      return expect(actions.loadCalendarData({ rootGetters }))
          .resolves.toBe(expected);
    });
  });
});
