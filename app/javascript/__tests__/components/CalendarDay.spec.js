import { mount } from '@vue/test-utils';
import CalendarDay from 'components/ErrorsViewer';

describe('f', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CalendarDay, {
      propsData: {
        day: 23,
        month: 2,
        year: 2020,
      },
    });
  });

  test('f', () => {
    expect(1).toBe(2);
  });
});
