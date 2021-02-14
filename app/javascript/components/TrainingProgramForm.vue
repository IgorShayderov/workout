<template>
  <FormWrapper
    :errors="errors"
    :shouldShowForm="shouldShowForm"
    :submitTitle="'Create training program'"
    @submit-form="createTrainingProgram"
    @close-form="closeForm"
  >
    <label>Title:
      <br>
      <input
        data-test-id="title"
        class="training-program-form__title"
        type="text"
        v-model="formData.title"
      >
    </label>
    <br>

    <label>
      Description(optional):
      <br>
      <textarea
        data-test-id="description"
        cols="30" rows="10"
        class="training-program-form__description"
        v-model="formData.description"
      ></textarea>
    </label>

    <FormLocation
      :location="formData.location"
      @change-location="changeLocation"
    />

  </FormWrapper>
</template>

<script>
import { mapActions } from 'vuex';

import formHelpers from '../mixins/formHelpers';

import FormLocation from './shared/FormLocation';
import FormWrapper from './shared/FormWrapper';

export default {
  mixins: [formHelpers],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        location: '',
      },
    };
  },
  methods: {
    ...mapActions('trainingPrograms',
        ['createAndSaveTrainingProgram'],
    ),
    createTrainingProgram() {
      const trainingProgramParams = {
        title: this.formData.title,
        description: this.formData.description,
        location: this.formData.location,
      };

      this.createAndSaveTrainingProgram(trainingProgramParams)
          .then(() => {
            this.clearErrors();
            this.clearForm();
            this.closeForm();
          },
          (errors) => {
            this.errors = errors;
          });
    },
    changeLocation(location) {
      this.formData.location = location;
    },
  },
  components: {
    FormLocation,
    FormWrapper,
  },
};
</script>

<style scoped>
.training-program-form_description {
  resize: none;
}

.training-program-form__exercises {
  margin-top: 8px;
}
</style>
