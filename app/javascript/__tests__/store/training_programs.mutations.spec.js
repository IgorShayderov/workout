/* eslint-disable new-cap */
import trainingPrograms from 'store/training_programs';

const { mutations } = trainingPrograms;

describe('vuex system module mutations', () => {
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
        trainingPrograms: [ existingTrainingProgram ],
      };
      const trainingProgram = { id: '2' };

      mutations.SAVE_TRAINING_PROGRAM(state, trainingProgram);

      expect(state.trainingPrograms).toContain(existingTrainingProgram);
    });
  });

  describe('SAVE_AVAILABLE_EXERCISES', () => {
    test('saves available exercises', () => {
      const state = {
        availableExercises: [],
      };
      const exercises = [ { id: '1' } ];
      const expected = { id: '1' };

      mutations.SAVE_AVAILABLE_EXERCISES(state, exercises);

      expect(state.availableExercises).toContainEqual(expected);
    });

    test('erase existing available exercises', () => {
      const existingExercise = { id: '1' };
      const state = {
        availableExercises: [ existingExercise ],
      };
      const exercises = [ { id: '2' } ];

      mutations.SAVE_AVAILABLE_EXERCISES(state, exercises);

      expect(state.availableExercises).not.toContain(existingExercise);
    });
  });

  describe('SAVE_TRAINING_PROGRAM_EXERCISES', () => {
    test('saves exercises assigned to training program', () => {
      const state = {
        trainingPrograms: [ { id: '1', exercises: [] } ],
      };
      const exercises = [ { id: '10' } ];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram });

      expect(state.trainingPrograms[0].exercises).toEqual(expect.arrayContaining(exercises));
    });

    test('doesn\'t erase existing exercises assigned to training program', () => {
      const existingExercise = { id: '11' };
      const state = {
        trainingPrograms: [ { id: '1', exercises: [ existingExercise ] } ],
      };
      const exercises = [ { id: '10' } ];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram });

      expect(state.trainingPrograms[0].exercises).toContain(existingExercise);
    });
  });

  describe('SAVE_COMMENTS', () => {
    test('saves comments assigned to training program', () => {
      const state = {
        trainingPrograms: [ { id: '1', comments: [] } ],
      };
      const comments = [ { id: '10' } ];
      const trainingProgram = state.trainingPrograms[0];

      mutations.SAVE_COMMENTS(state, { comments, trainingProgram });

      expect(state.trainingPrograms[0].comments).toEqual(expect.arrayContaining(comments));
    });

    test('doesn\'t erase existing comments assigned to training program', () => {
      const existingComment = { id: '11' };
      const state = {
        trainingPrograms: [ { id: '1', comments: [ existingComment ] } ],
      };
      const comments = [ { id: '10' } ];
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
        trainingPlans: [ existingTrainingPlan ],
      };
      const trainingPlan = { id: '2' };

      mutations.SAVE_TRAINING_PLAN(state, trainingPlan);

      expect(state.trainingPlans).toContain(existingTrainingPlan);
    });
  });
});
