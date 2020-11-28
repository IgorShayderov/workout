<template>
  <form-wrapper
    :errors="errors"
    :shouldShowForm="shouldShowForm"
    :submitTitle="'Create exercise'"
    @submit-form="createExercise"
    @close-form="closeForm"
  >

    <label>Title:
      <br>
      <input
        data-testid="title"
        class="form__title"
        type="text"
        v-model="formData.title"
      >
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

import FormWrapper from './shared/FormWrapper';
import FormLocation from './shared/FormLocation';
// if id === 0, then we should create new exercise, othervise update existing

export default {
  mixins: [ formHelpers ],
  props: {
    id: {
      type: [ Number, String ],
      required: true,
    },
  },
  data() {
    return {
      formData: {
        title: '',
        location: '',
      },
    };
  },
  methods: {
    ...mapActions('adminPanel',
        [ 'createAndSaveExercise' ],
    ),
    changeLocation(location) {
      this.formData.location = location;
    },
    createExercise() {
      const exerciseParams = {
        title: this.formData.title,
        location: this.formData.location,
      };

      this.createAndSaveExercise(exerciseParams)
          .then(() => {
            this.clearErrors();
            this.clearForm();
            this.closeForm();
          },
          (errors) => {
            this.errors = errors;
          });
    },
  },
  components: {
    FormWrapper,
    FormLocation,
  },
};
</script>

<style>

</style>
