import { mount } from '@vue/test-utils';
import FormWrapper from 'components/shared/FormWrapper';

const mountOptions = {
  propsData: {
    errors: [],
    submitTitle: '_',
  },
};

describe('FormWrapper component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FormWrapper, mountOptions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [false, false],
    [true, true],
  ])('form visibility is %s', async (expected, shouldShowForm) => {
    await wrapper.setProps({ shouldShowForm });

    const result = wrapper.isVisible();

    expect(result).toBe(expected);
  });

  test('emit close form on click close button', async () => {
    const expected = 1;

    const closeButton = wrapper.find('.form__btn-close');

    await closeButton.trigger('click');

    const result = wrapper.emitted('close-form').length;

    expect(result).toBe(expected);
  });

  test('emit submit on click submit button', async () => {
    const expected = 1;

    const submitButton = wrapper.find('.form__btn-submit');

    await submitButton.trigger('click');

    const result = wrapper.emitted('submit-form').length;

    expect(result).toBe(expected);
  });

  test('renders submit title', async () => {
    const expected = 'Submit title';

    await wrapper.setProps({ submitTitle: expected });

    const submitButton = wrapper.find('.form__btn-submit');
    const result = submitButton.text();

    expect(result).toBe(expected);
  });
});
