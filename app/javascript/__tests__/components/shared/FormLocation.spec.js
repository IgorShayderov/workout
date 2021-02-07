import { mount } from '@vue/test-utils';
import FormLocation from 'components/shared/FormLocation';

const mountOptions = {
  propsData: {
    location: 'gym',
  },
};

describe('FormLocation component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FormLocation, mountOptions);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('there are 2 locations', () => {
    const expected = 2;

    const result = wrapper.findAll('.form-location__radio-btn').length;

    expect(result).toBe(expected);
  });

  test('exists', () => {
    const expected = true;

    const gymCheckbox = wrapper.find('.form-location__radio-btn[value=\'gym\']');
    const result = gymCheckbox.exists();

    expect(result).toBe(expected);
  });

  test('renders location title', async () => {
    const expected = 'Gym';

    await wrapper.setProps({ location: 'gym' });

    const gymCheckbox = wrapper.findComponent({ ref: 'gym-checkbox' });
    const result = gymCheckbox.text();

    expect(result).toBe(expected);
  });

  test('on change emits change-location', async () => {
    const gymCheckbox = wrapper.find('.form-location__radio-btn[value=\'gym\']');
    const expected = 'gym';

    await wrapper.setProps({ location: 'outdoors' });
    await gymCheckbox.setChecked();

    const [result] = wrapper.emitted('change-location')[0];

    expect(result).toBe(expected);
  });

  test.each([
    [true, 'gym'],
    [false, 'outdoors'],
  ])('checkbox checked is %s', async (expected, location) => {
    const gymCheckbox = wrapper.find('.form-location__radio-btn[value=\'gym\']');

    await wrapper.setProps({ location });

    const result = gymCheckbox.element.checked;

    expect(result).toBe(expected);
  });
});
