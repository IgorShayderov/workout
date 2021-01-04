import system from 'store/system';

const { actions } = system;

describe('vuex system module actions', () => {
  afterEach(() => {
    commit.mockClear();
  });

  const commit = jest.fn();

  describe('showWrapper', () => {
    test('calls SHOW_WRAPPER mutation', () => {
      actions.showWrapper({ commit });

      expect(commit).toBeCalledWith('SHOW_WRAPPER');
    });
  });

  describe('hideWrapper', () => {
    test('calls HIDE_WRAPPER mutation', () => {
      actions.hideWrapper({ commit });

      expect(commit).toBeCalledWith('HIDE_WRAPPER');
    });
  });

  describe('saveToken', () => {
    test('calls HIDE_WRAPPER mutation', () => {
      const token = '_';

      actions.saveToken({ commit }, token);

      expect(commit).toBeCalledWith('SAVE_TOKEN', token);
    });
  });
});
