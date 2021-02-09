import { mount, createLocalVue } from '@vue/test-utils';
import AdminPanel from 'components/AdminPanel';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(Vuex);

const $router = {
  push: jest.fn(),
};
const mountOptions = {
  localVue,
  mocks: {
    $router,
  },
  stubs: {
    'router-view': true,
  },
};
const modules = {
  system: {
    namespaced: true,
  },
};
const actions = {
  'system/isUserAdmin': jest.fn(),
};
const getters = {
  'system/getUserInfo': jest.fn(),
};
const storeOptions = {
  modules,
  actions,
  getters,
};

describe('AdminPanel component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('if user is not admin', () => {
    let wrapper;

    beforeEach(() => {
      actions['system/isUserAdmin'].mockReturnValue(Promise.resolve());

      const store = new Vuex.Store(storeOptions);

      wrapper = mount(AdminPanel, { ...mountOptions, store });

      const next = jest.fn((callback) => callback(wrapper.vm));

      AdminPanel.beforeRouteEnter.call(wrapper.vm, undefined, undefined, next);
    });

    test('navigates to root', async () => {
      const expected = { name: 'root' };

      await flushPromises();

      const result = $router.push;

      expect(result).toHaveBeenCalledWith(expected);
    });

    test('emits flash message', async () => {
      const expected = 'You must be admin to be able to use admin panel';

      await flushPromises();

      const result = wrapper.vm.$root.__emitted['flash-message'][0][0];

      expect(result).toBe(expected);
    });
  });

  describe('user is admin', () => {
    test('doesn\'t navigate to root', async () => {
      actions['system/isUserAdmin'].mockReturnValue(Promise.resolve(true));

      const store = new Vuex.Store(storeOptions);
      const wrapper = mount(AdminPanel, { ...mountOptions, store });
      const next = jest.fn((callback) => callback(wrapper.vm));

      AdminPanel.beforeRouteEnter.call(wrapper.vm, undefined, undefined, next);

      await flushPromises();

      const result = $router.push;

      expect(result).not.toHaveBeenCalled();
    });
  });
});
