import adminPanel from 'store/admin_panel';

const { getters } = adminPanel;

describe('vuex admin_panel module getters', () => {
  const state = {
    exercises: [ { id: 1 }, { id: 2 } ],
  };

  describe('getExercises', () => {
    test('returns exercises', () => {
      const expected = state.exercises;

      expect(getters.getExercises(state)).toMatchObject(expected);
    });
  });

  describe('getExerciseById', () => {
    test('returns founded exercise', () => {
      const exerciseId = 1;
      const expected = { id: 1 };

      expect(getters.getExerciseById(state)(exerciseId)).toMatchObject(expected);
    });

    test('returns undefined', () => {
      const exerciseId = 10;

      expect(getters.getExerciseById(state)(exerciseId)).toBeUndefined();
    });
  });
});
