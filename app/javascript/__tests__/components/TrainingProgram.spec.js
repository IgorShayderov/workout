import { mount } from '@vue/test-utils';
import TrainingProgram from 'components/TrainingProgram';

describe('TrainingProgram component', () => {
  beforeEach(() => {

  });

  test('hz', () => {
    const trainingProgram = {
      id: 1,
      title: 'First training program',
      location: 'gym',
      exercises: [],
    };

    const wrapper = mount(TrainingProgram, {
      propsData: { trainingProgram },
    });

    expect(1).toBe(1);
  });
});
