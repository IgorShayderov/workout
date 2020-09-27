<template>
  <div>
    <div
      class="training-program-form_wrapper"
      v-show="shouldShowForm"
    >
      <div
        class="training-program-form_btn-close"
        @click="closeForm"
      >
          <i class="far fa-2x fa-times-circle"></i>
      </div>

      <form
        class="training-program-form m-4"
      >

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
          Description:
          <br>
          <textarea cols="30" rows="10"
            class="training-program-form_description"
            v-model="description"
          ></textarea>
        </label>

        <p>Exercises:</p>

        <p>Where to train?</p>

        <label>
          <input type="radio" name="where_to_train" value="gym" class="training-program-form_where-radio">
            Gym
        </label>

        <label>
          <input type="radio" name="where_to_train" value="outdoors" class="training-program-form_where-radio">
            Outdoors
        </label>
        <br>

        <div
          class="training-program-form_exercises"
        >
          <training-program-exercise
            v-for="(number, index) in [1,2,3,4,5]"
            :key="index"
          >
          </training-program-exercise>
        </div>

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
import { checkForError } from '../helpers/requests';
import { mapActions } from 'vuex';

import axios from 'axios';

import TrainingProgramExercise from './TrainingProgramExercise';

export default {
  props: {
    shouldShowForm: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    ...mapActions('trainingPrograms',
      ['addTrainingProgram'],
    ),
    closeForm() {
      this.$emit('closeForm');
    },
    clearForm() {
      this.title = '';
      this.description = '';
    },
    createTrainingProgram(event) {
      const tokenNode = document.querySelector("meta[name='csrf-token']");
      let token = '';

      if (tokenNode) {
        token = tokenNode.content;
      }

      axios({
        method: 'post',
        url: 'training_programs',
        data: {
          training_program: {
            title: this.title,
            description: this.description,
          }
        },
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
          'Accept': 'application/json',
        }
      })
      .then((response) => {
        const { data } = response;

        this.addTrainingProgram(data);
        this.clearForm();
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  components: {
    TrainingProgramExercise,
  },
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
  width: 60vw;
  border-radius: 10px;
  z-index: 20
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

.training-program-form_where-radio {

}

.training-program-form_exercises {
  margin-top: 8px;
}
</style>
