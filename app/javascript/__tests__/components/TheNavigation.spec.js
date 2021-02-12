import { mount, createLocalVue } from '@vue/test-utils';
import TheNavigation from 'components/TheNavigation';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

const modules = {
  system: {
    namespaced: true,
  },
};
const getters = {
  'system/getRootPath': jest.fn(),
  'system/getUserInfo': jest.fn(() => ({})),
};
const vuexOptions = {
  modules,
  getters,
};
const mocks = {
  $route: {
    name: ''
  },
  $router: {
    push: jest.fn(),
  },
};
const mountOptions = {
  localVue,
  mocks,
};

describe('TheNavigation component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [false, false],
    [true, true]
  ])('link to admin panel exists is %s when use admin is %s', (expected, isAdmin) => {
    getters['system/getUserInfo'].mockImplementation(() => ({ admin: isAdmin }));

    const store = new Vuex.Store(vuexOptions);
    const wrapper = mount(TheNavigation, { store, ...mountOptions });

    const adminPanelLink = wrapper.find('.toolbar__link[href=\'admin-panel\']');
    const result = adminPanelLink.exists();

    expect(result).toBe(expected);
  });

  describe('navigation', () => {
    afterEach(() => {
      mocks.$route.name = '';
    });

    test.each([
      ['root', 'root'],
      ['calendar', 'calendar'],
      ['profile', 'profile'],
      ['admin-panel', 'adminPanelExercises']
    ])('%s link navigates to %s', async (href, routeName) => {
      getters['system/getUserInfo'].mockImplementation(() => ({ admin: true }));

      const store = new Vuex.Store(vuexOptions);
      const wrapper = mount(TheNavigation, { store, ...mountOptions });
      const expected = { name: routeName };
  
      const link = wrapper.find(`.toolbar__link[href=\'${href}\']`);
  
      await link.trigger('click');
  
      const result = mocks.$router.push;

      expect(result).toHaveBeenCalledWith(expected);
    });

    test.each([
      ['root', 'root'],
      ['calendar', 'calendar'],
      ['profile', 'profile'],
      ['admin-panel', 'adminPanelExercises']
    ])('%s link does not navigates to %s when is on same route', async (href, routeName) => {
      getters['system/getUserInfo'].mockImplementation(() => ({ admin: true }));
      mocks.$route.name = routeName;

      const store = new Vuex.Store(vuexOptions);
      const wrapper = mount(TheNavigation, { store, ...mountOptions });

      const link = wrapper.find(`.toolbar__link[href=\'${href}\']`);

      await link.trigger('click');

      const result = mocks.$router.push;

      expect(result).not.toHaveBeenCalled();
    });
  });
});
