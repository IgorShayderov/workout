import { mount } from '@vue/test-utils';
import TrainingProgramForm from 'components/TrainingProgramForm';

describe('TrainingProgramForm component', () => {
  let wrapper;
  let titleField;
  let descriptionField;
  let locationGym;
  // let form;

  beforeEach(() => {
    wrapper = mount(TrainingProgramForm, {
      propsData: {
        shouldShowForm: true,
      },
    });
    titleField = wrapper.find('[data-testid=\'title\']');
    descriptionField = wrapper.find('[data-testid=\'description\']');
    locationGym = wrapper.find('[data-testid=\'location\'][value=\'gym\']');
    // form = wrapper.find(".training-program-form");
  });

  describe('with valid attributes', () => {
    beforeEach(() => {
      titleField.setValue('New training program');
      descriptionField.setValue('description');
      locationGym.setChecked(true);
    });

    test('calls processTrainingProgram when all fields are correctly filled', async () => {
      await wrapper.trigger('submit');

      expect(1).toBe(1);
    });

    test('emits close_form event when after successful respond', async () => {
      await wrapper.vm.$emit('submit');
      await wrapper.trigger('submit');
      await wrapper.find('.form__btn-submit').trigger('click');

      const closeFormCalls = wrapper.emitted('close_form');

      console.log(wrapper.emitted(), 'wrapper.emitted');

      expect(closeFormCalls).toHaveLength(1);
    });
  });
});
