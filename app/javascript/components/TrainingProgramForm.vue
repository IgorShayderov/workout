<template>
  <div>
    <div
      class="form-wrapper"
      v-show="shouldShowForm"
    >
      <form
        class="training-program-form m-4"
      >

        <div
          class="form__btn-close"
          @click="closeForm"
        >
            <i class="far fa-2x fa-times-circle"></i>
        </div>

        <label>Title:
          <br>
          <input
            data-testid="title"
            class="training-program-form__title"
            type="text"
            v-model="title"
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
            v-model="description"
          ></textarea>
        </label>

        <p>Where to train?</p>

        <label>
          <input
            data-testid="location"
            type="radio" name="where_to_train" value="gym"
            class="training-program-form__location"
            v-model="location"
          >
            Gym
        </label>

        <label>
          <input
            data-testid="location"
            type="radio" name="where_to_train" value="outdoors"
            class="training-program-form__location"
            v-model="location"
          >
            Outdoors
        </label>
        <br>

        <errors-viewer
          :errors="errors"
        >
        </errors-viewer>

        <input
          type="submit"
          value="Create new program"
          class="form__btn-submit"
          @click.prevent="createTrainingProgram"
        >
      </form>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

import axios from 'axios';
import formHelpers from '../mixins/formHelpers';

import ErrorsViewer from './ErrorsViewer';

export default {
  mixins: [ formHelpers ],
  data() {
    return {
      title: '',
      description: '',
      location: '',
    };
  },
  methods: {
    ...mapActions('trainingPrograms',
        [ 'saveTrainingProgram' ],
    ),
    createTrainingProgram(event) {
      const data = {
        training_program: {
          title: this.title,
          description: this.description,
          location: this.location,
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
  },
  components: {
    ErrorsViewer,
  },
};
</script>

<style scoped>
.training-program-form_description {
  resize: none;
}

.training-program-form__location {
  transform: scale(2);
  margin: 0 8px;
}

.training-program-form__exercises {
  margin-top: 8px;
}
</style>
