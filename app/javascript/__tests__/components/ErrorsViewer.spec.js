import { mount } from '@vue/test-utils';
import ErrorsViewer from 'components/ErrorsViewer';

describe('ErrorsViewer component', () => {
  let error;
  let wrapper;

  beforeEach(() => {
    error = 'Title can\'t be blank';
    wrapper = mount(ErrorsViewer, {
      propsData: {
        errors: [],
      },
    });
  });

  test('when there are errors thrown, errors-viewer should be visible', async () => {
    await wrapper.setProps({ errors: [error] });

    expect(wrapper.find('.errors-viewer').isVisible()).toBe(true);
  });

  test('when there are no errors, errors-viewer should not be visible', () => {
    expect(wrapper.find('.errors-viewer').isVisible()).toBe(false);
  });

  test('when there are errors thrown, they should be printed', async () => {
    await wrapper.setProps({ errors: [error] });

    expect(wrapper.text()).toContain(error);
  });

  test('should show errors when errors object passed', async () => {
    await wrapper.setProps({ errors: { title: ['can\'t be blank'] } });

    expect(wrapper.text()).toContain('Title can\'t be blank');
  });
});
