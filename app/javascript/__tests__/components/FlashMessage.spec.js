import { mount } from '@vue/test-utils';
import FlashMessage from 'components/FlashMessage';

describe('FlashMessage component', () => {
  const transitionStub = () => ({
    render: function(h) {
      return this.$options._renderChildren;
    },
  });
  const options = {
    stubs: {
      transition: transitionStub(),
    },
    propsData: {
      shouldBeDisplayed: true,
      text: 'text',
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FlashMessage, options);
  });

  describe('visibility', () => {
    test('is visible', () => {
      expect(wrapper.isVisible()).toBe(true);
    });

    test('is not visible', async () => {
      await wrapper.setProps({ shouldBeDisplayed: false });

      expect(wrapper.isVisible()).toBe(false);
    });
  });

  test('renders text from property', async () => {
    await wrapper.setProps({ text: 'Message text' });

    expect(wrapper.text()).toContain('Message text');
  });
});
