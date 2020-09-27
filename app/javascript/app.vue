<template>
  <div id="app">
    <h1 class="text-center">
      Workout
    </h1>

    <training-program
      v-for="(trainingProgram, index) in trainingPrograms"
      :key="index"
      :trainingProgram="trainingProgram"
    >
    </training-program>

    <training-program-form
      :shouldShowForm="shouldShowForm"
      @closeForm="shouldShowForm = false"
    >
    </training-program-form>

    <a
      href="#"
      @click.prevent="showForm"
    >
      New program
    </a>

    <the-wrapper
      :showWrapper="showWrapper"
    >
    </the-wrapper>

  </div>
</template>

<script>
import TrainingProgram from './components/TrainingProgram.vue';
import TrainingProgramForm from './components/TrainingProgramForm.vue';
import TheWrapper from './components/TheWrapper.vue';

export default {
  props: {
      trainingPrograms: {
        type: Array,
        required: true,
      },
  },
  data: function () {
    return {
      showWrapper: false,
      // later turn to false
      shouldShowForm: true,
    }
  },
  methods: {
    showForm() {
      this.shouldShowForm = true;
    },
  },
  computed: {
  },
  components: {
    TrainingProgram,
    TrainingProgramForm,
    TheWrapper,
  }
}
</script>

<style>

</style>
