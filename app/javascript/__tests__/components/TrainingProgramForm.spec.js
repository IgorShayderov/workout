import { mount } from '@vue/test-utils';
import TrainingProgramForm from 'components/TrainingProgramForm';

describe('TrainingProgramForm component', () => {
  let wrapper;
  let titleField;
  let descriptionField;
  let locationGym;

  beforeEach(() => {
    wrapper = mount(TrainingProgramForm, {
      propsData: {
        shouldShowForm: true
      }
    });
    titleField = wrapper.find("[data-testid='title']");
    descriptionField = wrapper.find("[data-testid='description']");
    locationGym = wrapper.find("[data-testid='location'][value='gym']");
  });

  describe('with valid attributes', () => {
    beforeEach(() => {
      titleField.setValue('New training program');
      descriptionField.setValue('description');
      locationGym.setChecked(true);
    });

    test('calls processTrainingProgram when all fields are correctly filled', () => {
      expect(1).toBe(2);
    });

    test('emits close_form event when after successful respond', async () => {
      await wrapper.trigger('submit');
      const closeFormCalls = wrapper.emitted('close_form');

      expect(closeFormCalls).toHaveLength(1);
    });
  });


});
