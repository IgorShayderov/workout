import { mount } from '@vue/test-utils';
import TrainingProgram from 'components/TrainingProgram';

const mocks = {
  $router: [],
};

describe('TrainingProgram component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('dummy new training program', () => {
    test('render title', () => {
      const wrapper = mount(TrainingProgram, {
        propsData: { trainingProgram: undefined, title: 'New program' },
      });
      const expected = 'New program';

      const result = wrapper.text();

      expect(result).toContain(expected);
    });

    test('doesn\'t render training program info block', () => {
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram: undefined, title: '_' } });
      const expected = false;

      const result = wrapper.find('.training-program-info').exists();

      expect(result).toBe(expected);
    });

    test('doesn\'t navigate to exercises board', async () => {
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram: undefined, title: '_' }, mocks });
      const expected = 0;

      await wrapper.trigger('click');

      const result = mocks.$router.length;

      expect(result).toBe(expected);
    });
  });

  describe('real training program', () => {
    const trainingProgram = {
      id: 1,
      title: 'First training program',
      location: 'gym',
      exercises: [{ id: 0 }],
    };

    test('renders training program title', () => {
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram } });
      const expected = 'First training program';

      const result = wrapper.text();

      expect(result).toContain(expected);
    });

    test('renders training program location', () => {
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram } });
      const expected = 'gym';

      const result = wrapper.find('.training-program-info').text();

      expect(result).toContain(expected);
    });

    test('renders training program exercises count', () => {
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram } });
      const expected = 'Exercises: 1';

      const result = wrapper.find('.training-program-info').text();

      expect(result).toContain(expected);
    });

    test('renders stub text when there are no exercises in program', () => {
      const trainingProgram = { exercises: [] };
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram } });
      const expected = 'No';

      const result = wrapper.find('.training-program-info').text();

      expect(result).toContain(expected);
    });

    test('on click navigate to exercises board', async () => {
      const wrapper = mount(TrainingProgram, { propsData: { trainingProgram }, mocks });
      const expected = {
        name: 'trainingProgramExercises',
        params: { trainingProgramId: trainingProgram.id },
      };

      await wrapper.trigger('click');

      const result = mocks.$router[0];

      console.log(mocks.$router, 'router');

      expect(result).toStrictEqual(expected);
    });
  });
});
