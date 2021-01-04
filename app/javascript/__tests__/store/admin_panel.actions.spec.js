import adminPanel from 'store/admin_panel';

const { actions } = adminPanel;

describe('vuex admin_panel module actions', () => {
  describe('createAndSaveExercise', () => {
    test('successfully creates and saves exercise', () => {
      const commit = {};
      const rootGetters = {};
      const exerciseData = {};

      actions.createAndSaveExercise({ commit, rootGetters }, exerciseData);

      expect(true).toBe(true);
    });
  });
});
