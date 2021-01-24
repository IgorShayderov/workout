<template>
  <FormWrapper
    :errors="errors"
    :shouldShowForm="shouldShowForm"
    :submitTitle="submitButtonTitle"
    @submit-form="exerciseFormSubmitHandler"
    @close-form="closeForm"
  >

    <label>
      Title:
      <br>
      <input
        data-test-id="title"
        class="form__title"
        type="text"
        v-model="formData.title"
      >
    </label>

    <br>

    <label>
      Image:
      <br>
      <input
        @change="saveImage"
        ref="exerciseImage"
        type="file"
        class="form__image-attach"
      >
    </label>

  </FormWrapper>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import formHelpers from '../mixins/formHelpers';

import FormWrapper from './shared/FormWrapper';

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
        image: null,
      },
    };
  },
  watch: {
    id(newIdValue) {
      if (newIdValue === 0) {
        this.formData.title = '';
      } else {
        this.formData.title = this.currentExercise.title;
      }
    },
  },
  methods: {
    ...mapActions('adminPanel',
        [ 'createAndSaveExercise', 'updateAndSaveExercise' ],
    ),
    saveImage() {
      console.log(this.$refs.exerciseImage.files[0], 'this.$refs.exerciseImage.files[0]');
      console.log(this.$refs.exerciseImage.files);

      this.formData.image = this.$refs.exerciseImage.files[0];
    },
    cleanUpAndClose() {
      this.clearErrors();
      this.clearForm();
      this.closeForm();
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
      const formData = new FormData();

      Object.keys(this.formData).forEach((formDataKey) => {
        if (this.formData[formDataKey] === null) {
          return;
        }

        formData.append(`exercise[${formDataKey}]`, this.formData[formDataKey]);
      });

      return formData;
    },
  },
  components: {
    FormWrapper,
  },
};
</script>

<style scoped>
.form__title {
  margin: 5px 0 10px 0;
}
.form__image-attach {
  margin: 5px 0 10px 0;
}
</style>
