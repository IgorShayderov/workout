/* eslint-disable new-cap */
import adminPanel from 'store/admin_panel';

const { mutations } = adminPanel;

describe('vuex admin_panel module mutations', () => {
  let exercises;

  beforeEach(() => {
    exercises = [
      { id: 1, title: 'exercise1' },
      { id: 2, title: 'exercise2' },
    ];
  });

  describe('SAVE_EXERCISES', () => {
    const newExercises = [ { id: 33 }, { id: 45 } ];

    test('saves new exercises', () => {
      const state = { exercises: [] };

      mutations.SAVE_EXERCISES(state, newExercises);

      expect(state.exercises).toMatchObject(newExercises);
    });

    test('contains old exercises', () => {
      const state = { exercises };


      mutations.SAVE_EXERCISES(state, newExercises);

      expect(state.exercises).toEqual(expect.arrayContaining(newExercises));
    });
  });

  describe('UPDATE_EXERCISE', () => {
    test('updates exercise', () => {
      const state = { exercises };
      const updatedExercise = {
        id: 1,
        title: 'new exercise',
      };

      mutations.UPDATE_EXERCISE(state, { updatedExercise, id: updatedExercise.id });

      expect(state.exercises[0]).toMatchObject(updatedExercise);
    });

    test('doesn\'t update exercise', () => {
      const state = { exercises };
      const updatedExercise = {
        id: 999,
        title: 'new exercise',
      };

      mutations.UPDATE_EXERCISE(state, { updatedExercise, id: updatedExercise.id });

      expect(state.exercises[0]).not.toMatchObject(updatedExercise);
    });
  });

  describe('DELETE_EXERCISE', () => {
    test('delete exercise', () => {
      const state = { exercises };
      const exercise = Object.assign(exercises[0]);
      const id = exercise.id;

      mutations.DELETE_EXERCISE(state, id);

      expect(state.exercises).not.toContainEqual(exercise);
    });

    test('doesn\'t delete exercise', () => {
      const state = { exercises };
      const exercisesBeforeDelete = Object.assign(exercises);
      const id = 999;

      mutations.DELETE_EXERCISE(state, id);

      expect(state.exercises).toMatchObject(exercisesBeforeDelete);
    });
  });
});
