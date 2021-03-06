/* eslint-disable new-cap */
import trainingPrograms from 'store/training_programs';

const { mutations } = trainingPrograms;

describe('vuex system module mutations', () => {
  describe('DELETE_TRAINING_PROGRAM_EXERCISE', () => {
    test('deletes training program exercise', () => {
      const state = {};
      const trainingProgram = {
        exercises: [{ training_program_exercise_id: 1 }, { training_program_exercise_id: 2 }],
      };
      const trainingProgramExerciseId = 1;

      mutations.DELETE_TRAINING_PROGRAM_EXERCISE(state, { trainingProgram, trainingProgramExerciseId });

      expect(trainingProgram.exercises).toContainEqual({ training_program_exercise_id: 2 });
      expect(trainingProgram.exercises).not.toContainEqual({ training_program_exercise_id: 1 });
    });
  });

  describe('SAVE_TRAINING_PROGRAM', () => {
    test('saves new training program', () => {
      const state = {
        trainingPrograms: [],
      };
      const trainingProgram = { id: '1' };
      const expected = Object.assign(trainingProgram);

      mutations.SAVE_TRAINING_PROGRAM(state, trainingProgram);

      expect(state.trainingPrograms).toContain(expected);
    });

    test('doesn\'t erase existing training programs', () => {
      const existingTrainingProgram = { id: '1' };
      const state = {
        trainingPrograms: [existingTrainingProgram],
      };
      const trainingProgram = { id: '2' };

      mutations.SAVE_TRAINING_PROGRAM(state, trainingProgram);

      expect(state.trainingPrograms).toContain(existingTrainingProgram);
    });
  });

  describe('SAVE_TRAINING_PROGRAM_EXERCISES', () => {
    test('saves exercises assigned to training program', () => {
      const state = {
        trainingPrograms: [{ id: '1', exercises: [] }],
      };
      const exercises = [{ id: '10' }];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram });

      expect(state.trainingPrograms[0].exercises).toEqual(expect.arrayContaining(exercises));
    });

    test('doesn\'t erase existing exercises assigned to training program', () => {
      const existingExercise = { id: '11' };
      const state = {
        trainingPrograms: [{ id: '1', exercises: [existingExercise] }],
      };
      const exercises = [{ id: '10' }];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram });

      expect(state.trainingPrograms[0].exercises).toContain(existingExercise);
    });
  });

  describe('SAVE_COMMENTS', () => {
    test('saves comments assigned to training program', () => {
      const state = {
        trainingPrograms: [{ id: '1', comments: [] }],
      };
      const comments = [{ id: '10' }];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_COMMENTS(state, { comments, trainingProgram });

      expect(state.trainingPrograms[0].comments).toEqual(expect.arrayContaining(comments));
    });

    test('doesn\'t erase existing comments assigned to training program', () => {
      const existingComment = { id: '11' };
      const state = {
        trainingPrograms: [{ id: '1', comments: [existingComment] }],
      };
      const comments = [{ id: '10' }];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_COMMENTS(state, { comments, trainingProgram });

      expect(state.trainingPrograms[0].comments).toContain(existingComment);
    });
  });

  describe('SAVE_TRAINING_PLAN', () => {
    test('saves new training plan', () => {
      const state = {
        trainingPlans: [],
      };
      const trainingPlan = { id: '1' };
      const expected = Object.assign(trainingPlan);

      mutations.SAVE_TRAINING_PLAN(state, trainingPlan);

      expect(state.trainingPlans).toContain(expected);
    });

    test('doesn\'t erase existing training plans', () => {
      const existingTrainingPlan = { id: '1' };
      const state = {
        trainingPlans: [existingTrainingPlan],
      };
      const trainingPlan = { id: '2' };

      mutations.SAVE_TRAINING_PLAN(state, trainingPlan);

      expect(state.trainingPlans).toContain(existingTrainingPlan);
    });
  });
});
