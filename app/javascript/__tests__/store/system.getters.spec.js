import system from 'store/system';

const { getters } = system;

describe('vuex system module getters', () => {
  describe('getUserInfo', () => {
    test('returns user info', () => {
      const expected = {
        name: 'user',
      };
      const state = {
        userInfo: expected,
      };

      expect(getters.getUserInfo(state)).toMatchObject(expected);
    });
  });

  describe('getRootPath', () => {
    test('returns root path', () => {
      const expected = 'path';
      const state = { rootPath: 'path' };

      expect(getters.getRootPath(state)).toBe(expected);
    });
  });

  describe('getWrapperStatus', () => {
    test('returns wrapper status', () => {
      const expected = false;
      const state = { showWrapper: false };

      expect(getters.getWrapperStatus(state)).toBe(expected);
    });
  });

  describe('getToken', () => {
    test('returns authentication token', () => {
      const expected = '_';
      const state = { token: '_' };

      expect(getters.getToken(state)).toBe(expected);
    });
  });

  describe('getPostHeaders', () => {
    test('returns post headers', () => {
      const expected = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': '_',
        'Accept': 'application/json',
      };
      const _getters = { getToken: '_' };
      const state = {};

      expect(getters.getPostHeaders(state, _getters)).toMatchObject(expected);
    });
  });
});
