/* eslint-disable new-cap */
import system from 'store/system';

const { mutations } = system;

describe('vuex system module mutations', () => {
  describe('SHOW_WRAPPER', () => {
    test('shows wrapper', () => {
      const state = {
        showWrapper: false,
      };

      mutations.SHOW_WRAPPER(state);

      expect(state.showWrapper).toBe(true);
    });
  });

  describe('HIDE_WRAPPER', () => {
    test('hides wrapper', () => {
      const state = {
        showWrapper: true,
      };

      mutations.HIDE_WRAPPER(state);

      expect(state.showWrapper).toBe(false);
    });
  });

  describe('SAVE_TOKEN', () => {
    test('saves token', () => {
      const expected = 'token';
      const state = {
        token: '_',
      };

      mutations.SAVE_TOKEN(state, expected);

      expect(state.token).toBe(expected);
    });
  });
});
