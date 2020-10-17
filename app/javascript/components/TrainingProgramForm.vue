<template>
  <div>
    <div
      class="training-program-form_wrapper"
      v-show="shouldShowForm"
    >
      <form
        class="training-program-form m-4"
      >

        <div
          class="training-program-form_btn-close"
          @click="closeForm"
        >
            <i class="far fa-2x fa-times-circle"></i>
        </div>

        <label>Title:
          <br>
          <input
            class="training-program-form_title"
            type="text"
            v-model="title"
          >
        </label>
        <br>

        <label>
          Description(optional):
          <br>
          <textarea cols="30" rows="10"
            class="training-program-form_description"
            v-model="description"
          ></textarea>
        </label>

        <p>Where to train?</p>

        <label>
          <input type="radio" name="where_to_train" value="gym"
            class="training-program-form_location"
            v-model="location"
          >
            Gym
        </label>

        <label>
          <input type="radio" name="where_to_train" value="outdoors"
            class="training-program-form_location"
            v-model="location"
          >
            Outdoors
        </label>
        <br>

        <errors-viewer
          :showErrors="showErrors"
          :errors="errors"
        >
        </errors-viewer>

        <input
          type="submit"
          value="Create new program"
          class="training-program-form_btn-submit"
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
  mixins: [formHelpers],
  data() {
    return {
      title: '',
      description: '',
      location: '',
    }
  },
  methods: {
    ...mapActions('trainingPrograms',
      ['saveTrainingProgram', 'processTrainingProgram'],
    ),
    createTrainingProgram(event) {
      const data = {
        training_program: {
          title: this.title,
          description: this.description,
          location: this.location,
        }
      };

      this.processTrainingProgram(data)
      .then((trainingProgram) => {
        this.clearErrors();
        this.saveTrainingProgram(trainingProgram);
        this.clearForm();
        this.closeForm();
      },
      (errors) => {
        this.errors = errors;
        this.showErrors = true;
      });
    },
  },
  components: {
    ErrorsViewer,
  }
}
</script>

<style scoped>
.training-program-form_wrapper {
  position: absolute;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 70vw;
  border-radius: 10px;
  z-index: 20;
  background: linear-gradient(to left, hsla(221, 42%, 28%, 1),
                                       hsla(247, 32%, 49%, 1),
                                       hsla(274, 48%, 59%, 1));
}

.training-program-form_description {
  resize: none;
}

.training-program-form_btn-close {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}

.training-program-form_btn-submit {
  position: absolute;
  margin-bottom: 16px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.training-program-form_location {
  transform: scale(2);
  margin: 0 8px;
}

.training-program-form_exercises {
  margin-top: 8px;
}
</style>
