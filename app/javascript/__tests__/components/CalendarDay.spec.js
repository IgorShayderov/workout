import { mount, createLocalVue } from '@vue/test-utils';
import CalendarDay from 'components/CalendarDay';
import TrainingPlanForm from 'components/TrainingPlanForm';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

const modules = {
  system: {
    namespaced: true,
  },
  trainingPrograms: {
    namespaced: true,
  },
};
const getters = {
  'trainingPrograms/getTrainingPlansByDate': jest.fn(),
  'trainingPrograms/getTrainingProgramById': jest.fn(),
  // child getters
  'trainingPrograms/getTrainingPrograms': jest.fn(),
};
const actions = {
  'system/showWrapper': jest.fn(),
  'system/hideWrapper': jest.fn(),
  'trainingPrograms/loadTrainingPlans': jest.fn(),
};
const mountOptions = {
  localVue,
  propsData: {
    day: 0,
    month: 0,
    year: 0,
  },
};
const storeOptions = {
  modules,
  getters,
  actions,
};

describe('CalendayDay component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('render dummy text when there are no training plans', () => {
    getters['trainingPrograms/getTrainingPlansByDate'].mockReturnValue(() => []);

    const store = new Vuex.Store(storeOptions);
    const wrapper = mount(CalendarDay, { ...mountOptions, store });
    const expected = 'No training plans';

    const trainingPlans = wrapper.find('.calendar-day__training-plans');
    const result = trainingPlans.text();

    expect(result).toContain(expected);
  });

  test('doesn\'t render dummy text when training plans exists', () => {
    getters['trainingPrograms/getTrainingPlansByDate'].mockReturnValue(() => [{ id: 0 }]);
    getters['trainingPrograms/getTrainingProgramById'].mockReturnValue(() => ({}));

    const store = new Vuex.Store(storeOptions);
    const wrapper = mount(CalendarDay, { ...mountOptions, store });
    const expected = 'No training plans';

    const trainingPlans = wrapper.find('.calendar-day__training-plans');
    const result = trainingPlans.text();

    expect(result).not.toContain(expected);
  });

  test('render training plan\'s info', () => {
    const trainingPlanMock = {
      id: 0,
      start_time: '2021-02-05 12:00:00',
      end_time: '2021-02-05 14:00:00',
    };

    getters['trainingPrograms/getTrainingPlansByDate'].mockReturnValue(() => [trainingPlanMock]);
    getters['trainingPrograms/getTrainingProgramById'].mockReturnValue(() => ({ title: 'title' }));

    const store = new Vuex.Store(storeOptions);
    const wrapper = mount(CalendarDay, { ...mountOptions, store });
    const expected = '12:00 - 14:00 title';

    const trainingPlan = wrapper.find('.calendar-day__training-plans li');
    const result = trainingPlan.text();

    expect(result).toContain(expected);
  });

  describe('when form emits close-form', () => {
    let wrapper;

    beforeEach(() => {
      getters['trainingPrograms/getTrainingPlansByDate'].mockReturnValue(() => []);

      const store = new Vuex.Store(storeOptions);

      wrapper = mount(CalendarDay, { ...mountOptions, store });
    });

    test('hide wrapper', async () => {
      const expected = 1;

      const trainingPlanForm = wrapper.findComponent(TrainingPlanForm);

      await trainingPlanForm.vm.$emit('close-form');

      const result = actions['system/hideWrapper'].mock.calls.length;

      expect(result).toBe(expected);
    });

    test('close form', async () => {
      const expected = false;

      const trainingPlanForm = wrapper.findComponent(TrainingPlanForm);

      await trainingPlanForm.vm.$emit('close-form');

      const result = wrapper.vm.shouldShowForm;

      expect(result).toBe(expected);
    });
  });

  describe('when click on add training plan button', () => {
    let wrapper;

    beforeEach(() => {
      getters['trainingPrograms/getTrainingPlansByDate'].mockReturnValue(() => []);

      const store = new Vuex.Store(storeOptions);

      wrapper = mount(CalendarDay, { ...mountOptions, store });
    });

    test('show form', async () => {
      const expected = true;

      const addTrainingPlanButton = wrapper.find('[data-test-id=\'add-training-plan-btn\']');

      await addTrainingPlanButton.trigger('click');

      const result = wrapper.vm.shouldShowForm;

      expect(result).toBe(expected);
    });

    test('show wrapper', async () => {
      const expected = 1;

      const addTrainingPlanButton = wrapper.find('[data-test-id=\'add-training-plan-btn\']');

      await addTrainingPlanButton.trigger('click');

      const result = actions['system/showWrapper'].mock.calls.length;

      expect(result).toBe(expected);
    });
  });
});
