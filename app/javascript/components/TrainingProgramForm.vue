<template>
  <form-wrapper
    :errors="errors"
    :shouldShowForm="shouldShowForm"
    :submitTitle="'Create training program'"
    @submit-form="createTrainingProgram"
    @close-form="closeForm"
  >
    <label>Title:
      <br>
      <input
        data-testid="title"
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
        data-testid="description"
        cols="30" rows="10"
        class="training-program-form__description"
        v-model="formData.description"
      ></textarea>
    </label>

    <form-location
      :location="formData.location"
      @change-location="changeLocation"
    >
    </form-location>

  </form-wrapper>
</template>

<script>
import { mapActions } from 'vuex';

import formHelpers from '../mixins/formHelpers';
import FormLocation from './shared/FormLocation';
import FormWrapper from './shared/FormWrapper';

export default {
  mixins: [ formHelpers ],
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
        [ 'saveTrainingProgram' ],
    ),
    createTrainingProgram(event) {
      const data = {
        training_program: {
          title: this.formData.title,
          description: this.formData.description,
          location: this.formData.location,
        },
      };

      this.saveTrainingProgram(data)
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
