import { mount } from '@vue/test-utils';
import TheWrapper from 'components/TheWrapper';

describe('TheWrapper component', () => {
  test.each([
    [false, false],
    [true, true],
  ])('wrapper visibility is %s when showWrapper is %s', (expected, showWrapper) => {
    const wrapper = mount(TheWrapper, {
      propsData: {
        showWrapper,
      },
    });

    const result = wrapper.isVisible();

    expect(result).toBe(expected);
  });
});
