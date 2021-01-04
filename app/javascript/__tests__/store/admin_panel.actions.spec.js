import adminPanel from 'store/admin_panel';
import axios from 'axios';

jest.mock('axios', () => jest.fn());

const { actions } = adminPanel;
const rootGetters = {};

describe('vuex admin_panel module actions', () => {
  afterEach(() => {
    commit.mockClear();
    axios.mockClear();
  });
  const commit = jest.fn();

  describe('createAndSaveExercise', () => {
    const exerciseData = {};

    test('successfully creates and saves exercise', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'data' }));
      const response = await actions.createAndSaveExercise({ commit, rootGetters }, exerciseData);

      expect(response).toBeUndefined();
      expect(commit).toHaveBeenCalledWith('SAVE_EXERCISES', [ 'data' ]);
    });

    test('doesn\'t create, reject with errors', () => {
      const expected = 'error';

      axios.mockImplementationOnce(() => Promise.resolve({ data: { errors: 'error' } }));

      expect.assertions(1);
      return expect(actions.createAndSaveExercise({ commit, rootGetters }, exerciseData))
          .rejects.toBe(expected);
    });

    test('throws error', async () => {
      axios.mockImplementationOnce(() => {
        throw new Error('_');
      });

      expect.assertions(2);
      await actions.createAndSaveExercise({ commit, rootGetters }, exerciseData).catch((error) => {
        expect(error.name).toEqual(expect.stringContaining('Error'));
        expect(error.message).toEqual(expect.stringContaining('_'));
      });
    });
  });

  describe('updateAndSaveExercise', () => {
    const exerciseData = {};
    const id = 1;

    test('successfully updates and saves exercise', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: 'data' }));
      const response = await actions.updateAndSaveExercise({ commit, rootGetters }, { exerciseData, id });

      expect(response).toBeUndefined();
      expect(commit).toHaveBeenCalledWith('UPDATE_EXERCISE', { id, updatedExercise: 'data' });
    });

    test('doesn\'t update, reject with errors', () => {
      const expected = 'error';

      axios.mockImplementationOnce(() => Promise.resolve({ data: { errors: 'error' } }));

      expect.assertions(1);
      return expect(actions.updateAndSaveExercise({ commit, rootGetters }, { exerciseData, id }))
          .rejects.toBe(expected);
    });

    test('throws error', async () => {
      axios.mockImplementationOnce(() => {
        throw new Error('_');
      });

      expect.assertions(2);
      await actions.updateAndSaveExercise({ commit, rootGetters }, { exerciseData, id }).catch((error) => {
        expect(error.name).toEqual(expect.stringContaining('Error'));
        expect(error.message).toEqual(expect.stringContaining('_'));
      });
    });
  });

  describe('loadExercises', () => {
    test('successfully load exercises', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: [ '_' ] }));

      await actions.loadExercises({ commit, rootGetters });

      expect(commit).toHaveBeenCalledWith('SAVE_EXERCISES', [ '_' ]);
    });

    test('throws error', () => {
      axios.mockImplementationOnce(() => {
        throw new Error('_');
      });

      expect(() => {
        actions.loadExercises({ commit, rootGetters });

        expect(axios).toBeCalledTimes(1);
      }).toThrowError('_');
    });
  });

  describe('deleteExercise', () => {
    const id = 1;

    test('successfully deteles exercise', async () => {
      axios.mockImplementationOnce(() => Promise.resolve({ data: { id: 1 } }));

      await actions.deleteExercise({ commit, rootGetters }, id);

      expect(commit).toHaveBeenCalledWith('DELETE_EXERCISE', 1);
    });

    test('throws error', () => {
      axios.mockImplementationOnce(() => {
        throw new Error('_');
      });

      expect(() => {
        actions.deleteExercise({ commit, rootGetters }, id );

        expect(axios).toBeCalledTimes(1);
      }).toThrowError('_');
    });
  });
});
