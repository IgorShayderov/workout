<template>
  <div>
    <a
      href="#"
      @click.prevent="showForm"
    >
      New program
    </a>

    <div
      class="training-program-form-wrapper"
      v-show="shouldShowForm"
    >
      <div class="training-program-form-btn-close">
          <i class="far fa-2x fa-times-circle"></i>
      </div>

      <form
        class="m-4"
      >

        <label for="training_program_title">Title:</label>
        <br>
        <input
          id="training_program_title"
          type="text"
          v-model="title"
        >
        <br>

        <input
          type="submit"
          value="Create new program"
          class="my-2"
          @click.prevent="createTrainingProgram"
          >
      </form>
    </div>

  </div>
</template>

<script>
import { checkForError } from '../helpers/requests';

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
    }
  },
  methods: {
    showForm() {
      this.$emit('showForm');
    },
    createTrainingProgram(event) {
      const tokenNode = document.querySelector("meta[name='csrf-token']");
      let token = '';

      if (tokenNode) {
        token = tokenNode.content;
      }

      fetch('training_programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          training_program: {
            title: this.title,
          }
        }),
      })
        .then((response) => {
          console.log(response, 'before json()');
          checkForError(response);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    },
  },
}
</script>

<style scoped>
.training-program-form-wrapper {
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

.training-program-form-btn-close {
  position: absolute;
}
</style>
