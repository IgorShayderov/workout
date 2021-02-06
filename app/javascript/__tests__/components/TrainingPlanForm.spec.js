import { mount, createLocalVue } from '@vue/test-utils';
import TrainingPlanForm from 'components/TrainingPlanForm';
import FormWrapper from 'components/shared/FormWrapper';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

const modules = {
  trainingPrograms: {
    namespaced: true,
  },
};
const getters = {
  'trainingPrograms/getTrainingPrograms': jest.fn(),
};
const actions = {
  'trainingPrograms/saveTrainingPlan': jest.fn(),
};
const vuexOptions = {
  modules,
  getters,
  actions,
};
const mountOptions = {
  localVue,
  propsData: {
    dateInfo: {
      year: 0,
      month: 0,
      day: 0,
    },
    shouldShowForm: true,
  },
};

describe('TrainingPlanForm component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on close-form event', () => {
    test('emit close form', () => {
      const store = new Vuex.Store(vuexOptions);
      const wrapper = mount(TrainingPlanForm, { ...mountOptions, store });
      const expected = 1;

      const formWrapper = wrapper.findComponent(FormWrapper);

      formWrapper.vm.$emit('close-form');

      const result = wrapper.emitted()['close-form'].length;

      expect(result).toBe(expected);
    });
  });

  describe('on submit-form event', () => {
    test('assigns training plan', () => {
      return new Promise((done) => {
        actions['trainingPrograms/saveTrainingPlan'].mockReturnValue(Promise.resolve());

        const store = new Vuex.Store(vuexOptions);
        const wrapper = mount(TrainingPlanForm, { ...mountOptions, store });
        const expected = 1;

        const formWrapper = wrapper.findComponent(FormWrapper);

        wrapper.setData({ formData: { selectedTrainingProgramId: '_' } });
        formWrapper.vm.$emit('submit-form');

        const result = actions['trainingPrograms/saveTrainingPlan'].mock.calls.length;

        wrapper.vm.$nextTick(() => {
          expect(result).toBe(expected);
          done();
        });
      });
    });

    test('adds error', () => {
      return new Promise((done) => {
        actions['trainingPrograms/saveTrainingPlan'].mockReturnValue(Promise.resolve());

        const store = new Vuex.Store(vuexOptions);
        const wrapper = mount(TrainingPlanForm, { ...mountOptions, store });
        const expected = 'can\'t be blank';

        const formWrapper = wrapper.findComponent(FormWrapper);

        formWrapper.vm.$emit('submit-form');

        const result = wrapper.vm.errors.training_program;

        wrapper.vm.$nextTick(() => {
          expect(result).toContain(expected);
          done();
        });
      });
    });
  });

  test('shows training programs titles in select', () => {
    getters['trainingPrograms/getTrainingPrograms'].mockReturnValue([{ title: 'My program' }]);

    const store = new Vuex.Store(vuexOptions);
    const wrapper = mount(TrainingPlanForm, { ...mountOptions, store });
    const expected = 'My program';

    const trainingProgramSelect = wrapper.find('[data-test-id=\'training-program-select\']');
    const result = trainingProgramSelect.text();

    expect(result).toBe(expected);
  });
});
