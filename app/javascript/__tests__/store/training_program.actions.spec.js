import actions from 'store/training_programs/training_programs_actions';
import axios from 'axios';

jest.mock('axios', () => jest.fn());

const rootGetters = {};
const getters = {
  getTrainingProgramById: jest.fn(),
};

describe('vuex training programs module actions', () => {
  afterEach(() => {
    commit.mockClear();
    axios.mockClear();
  });
  const commit = jest.fn();

  describe('deleteExerciseFromProgram', () => {
    const data = {
      trainingProgramId: '_',
      trainingProgramExerciseId: '_',
    };

    test('successfully deletes exercise from training program', async () => {
      const trainingProgram = '_';

      axios.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      getters.getTrainingProgramById.mockReturnValue('_');

      await actions.deleteExerciseFromProgram({ commit, getters, rootGetters }, data);

      expect(commit)
          .toHaveBeenCalledWith('DELETE_TRAINING_PROGRAM_EXERCISE',
              { trainingProgram, trainingProgramExerciseId: data.trainingProgramExerciseId });
    });

    test('rejects with error', () => {
      const expected = ['error'];

      axios.mockImplementationOnce(() => Promise.resolve({ data: { errors: ['error'] } }));

      expect.assertions(1);
      return expect(actions.deleteExerciseFromProgram({ commit, getters, rootGetters }, data))
          .rejects.toStrictEqual(expected);
    });
  });

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
