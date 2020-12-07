import { mount } from '@vue/test-utils';
import TrainingProgramForm from 'components/TrainingProgramForm';

describe('TrainingProgramForm component', () => {
  let wrapper;
  let titleField;
  let descriptionField;
  let locationGym;
  let form;
  let submitBtn;

  beforeEach(() => {
    wrapper = mount(TrainingProgramForm, {
      propsData: {
        shouldShowForm: true,
      },
    });

    titleField = wrapper.find('[data-testid=\'title\']');
    descriptionField = wrapper.find('[data-testid=\'description\']');
    locationGym = wrapper.find('[data-testid=\'location\'][value=\'gym\']');
    form = wrapper.find('.training-program-form');
    submitBtn = wrapper.find('.form__btn-submit');
  });

  describe('fills the form', () => {
    beforeEach(() => {
      descriptionField.setValue('description');
      locationGym.setChecked(true);
    });

    //   await wrapper.trigger('submit');

    test('with valid attributes closes the form', async () => {
      titleField.setValue('New training program');

      console.log(form, 'form');
      console.log(submitBtn, 'submitBtn');

      await wrapper.vm.$emit('submit');
      await wrapper.find('.form__btn-submit').trigger('click');

      const closeFormCalls = wrapper.emitted('close_form');

      console.log(wrapper.emitted(), 'wrapper.emitted');

      expect(closeFormCalls).toHaveLength(1);
    });

    test('with invalid attributes shows error message', async () => {
      titleField.setValue('');

      // await wrapper.
    });
  });
});
