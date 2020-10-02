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

        <div
          v-show="showErrors"
          class="alert alert-danger"
        >
          <h4>Errors encountered:</h4>
          <div class="training_program-form_errors">
          </div>
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

export default {
  props: {
    shouldShowForm: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      showErrors: false,
      title: '',
      description: '',
      location: '',
    }
  },
  methods: {
    ...mapActions('trainingPrograms',
      ['addTrainingProgram'],
    ),
    closeForm() {
      const errorsNode = document.querySelector('.training_program-form_errors');

      this.$emit('closeForm');
      errorsNode.innerHTML = '';
      this.showErrors = false;
    },
    clearForm() {
      this.title = '';
      this.description = '';
      this.location = '';
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
            location: this.location,
          }
        },
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
          'Accept': 'application/json',
        }
      })
      .then((response) => {
        const errorsNode = document.querySelector('.training_program-form_errors');
        const { data } = response;

        if (data.errors) {
          const { errors } = data;
          const errorsKeys = Object.keys(errors);

          const errorsText = errorsKeys.reduce((finalMessage, errorKey) => {
            finalMessage += `${errorKey[0].toUpperCase() + errorKey.substring(1)}:<br>`;

            errors[errorKey].forEach((errorMessage) => {
              finalMessage += `${errorMessage}<br>`;
            });

            return finalMessage;
          }, '');

          this.showErrors = true;
          errorsNode.innerHTML = errorsText;
        } else {
          errorsNode.innerHTML = '';
          this.showErrors = false;
          this.addTrainingProgram(data);
          this.clearForm();
          this.closeForm();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
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
