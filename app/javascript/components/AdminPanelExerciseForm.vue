<template>
  <form-wrapper
    :errors="errors"
    :shouldShowForm="shouldShowForm"
    :submitTitle="submitButtonTitle"
    @submit-form="exerciseFormSubmitHandler"
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
import { mapGetters, mapActions } from 'vuex';

import formHelpers from '../mixins/formHelpers';

import FormWrapper from './shared/FormWrapper';
import FormLocation from './shared/FormLocation';
// if id === 0, then we should create new exercise, othervise update existing

export default {
  mixins: [ formHelpers ],
  props: {
    id: {
      type: [ Number ],
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
  watch: {
    id(newIdValue) {
      if (newIdValue === 0) {
        this.formData.title = '';
        this.formData.location = '';
      } else {
        this.formData.title = this.currentExercise.title;
        this.formData.location = this.currentExercise.location;
      }
    },
  },
  methods: {
    ...mapActions('adminPanel',
        [ 'createAndSaveExercise', 'updateAndSaveExercise' ],
    ),
    cleanUpAndClose() {
      this.clearErrors();
      this.clearForm();
      this.closeForm();
    },
    changeLocation(location) {
      this.formData.location = location;
    },
    createExercise() {
      this.createAndSaveExercise(this.exerciseParams)
          .then(() => {
            this.cleanUpAndClose();
          },
          (errors) => {
            this.errors = errors;
          });
    },
    updateExercise() {
      this.updateAndSaveExercise({ exerciseParams: this.exerciseParams, id: this.id })
          .then(() => {
            this.cleanUpAndClose();
          },
          (errors) => {
            this.errors = errors;
          });
    },
    exerciseFormSubmitHandler() {
      this.id > 0 ? this.updateExercise() : this.createExercise();
    },
  },
  computed: {
    ...mapGetters('adminPanel',
        [ 'getExerciseById' ],
    ),
    currentExercise() {
      return this.getExerciseById(this.id);
    },
    submitButtonTitle() {
      return this.id > 0 ? 'Update exercise' : 'Create exercise';
    },
    exerciseParams() {
      return {
        title: this.formData.title,
        location: this.formData.location,
      };
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