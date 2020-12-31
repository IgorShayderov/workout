import trainingPrograms from 'store/training_programs';

const { getters } = trainingPrograms;

describe('vuex system module getters', () => {
  describe('getAvailableExercises', () => {
    test('returns available exercises', () => {
      const state = {
        availableExercises: [ 'exercise' ],
      };
      const expected = [ 'exercise' ];

      expect(getters.getAvailableExercises(state)).toMatchObject(expected);
    });
  });

  describe('getTrainingPrograms', () => {
    test('returns training programs', () => {
      const state = {
        trainingPrograms: [ 'program' ],
      };
      const expected = [ 'program' ];

      expect(getters.getTrainingPrograms(state)).toMatchObject(expected);
    });
  });

  describe('getCommentsByTrainingProgramId', () => {
    test('returns comments', () => {
      const state = {
        trainingPrograms: [ { id: '1', comments: [ 'comment' ] } ],
      };
      const expected = [ 'comment' ];
      const _getters = {
        getTrainingProgramById: () => state.trainingPrograms[0],
      };

      expect(getters.getCommentsByTrainingProgramId(state, _getters)('1')).toMatchObject(expected);
    });

    test('returns empty array when training program wasn\'t found', () => {
      const state = {
        trainingPrograms: [ { id: '1', comments: [ 'comment' ] } ],
      };
      const expected = [];
      const _getters = {
        getTrainingProgramById: () => state.trainingPrograms[100],
      };

      expect(getters.getCommentsByTrainingProgramId(state, _getters)('100')).toMatchObject(expected);
    });
  });

  describe('getTrainingProgramById', () => {
    const state = {
      trainingPrograms: [ { id: '1' } ],
    };

    test('returns training program when argument is string', () => {
      const expected = { id: '1' };

      expect(getters.getTrainingProgramById(state)('1')).toMatchObject(expected);
    });

    test('returns training program when argument is number', () => {
      const expected = { id: '1' };

      expect(getters.getTrainingProgramById(state)(1)).toMatchObject(expected);
    });

    test('returns undefined when training program wasn\'t found', () => {
      expect(getters.getTrainingProgramById(state)('100')).toBeUndefined();
    });
  });

  describe('getAvailableExerciseById', () => {
    const state = {
      availableExercises: [ { id: '1' } ],
    };

    test('returns available exercise when argument is string', () => {
      const expected = { id: '1' };

      expect(getters.getAvailableExerciseById(state)('1')).toMatchObject(expected);
    });

    test('returns available exercise when argument is number', () => {
      const expected = { id: '1' };

      expect(getters.getAvailableExerciseById(state)(1)).toMatchObject(expected);
    });

    test('returns undefined when available exercise wasn\'t found', () => {
      expect(getters.getAvailableExerciseById(state)('100')).toBeUndefined();
    });
  });

  describe('getTrainingPlansByDate', () => {
    // отчет месяцев начинается с 0
    const trainingPlansStorage = [
      {
        id: '1',
        start_time: '2020-12-31 15:55:00',
        end_time: '2020-12-31 16:25:00',
      },
      {
        id: '2',
        start_time: '2020-12-30 15:55:00',
        end_time: '2020-12-30 16:25:00',
      },
    ];
    const year = 2020;
    const month = 12;
    const day = 31;

    test('returns empty array when there are no training plans', () => {
      const state = {
        trainingPlans: [],
      };
      const expected = [];

      expect(getters.getTrainingPlansByDate(state)(year, month, day)).toMatchObject(expected);
    });

    test.each([
      [ 30, '2' ],
      [ 31, '1' ],
    ])('returns training plans within the date', (_day, id) => {
      const state = {
        trainingPlans: trainingPlansStorage,
      };
      const expected = trainingPlansStorage.find((trainingPlan) => trainingPlan.id === id);

      expect(getters.getTrainingPlansByDate(state)(year, month, _day))
          .toEqual(expect.arrayContaining([ expected ]));
    });
  });
});
