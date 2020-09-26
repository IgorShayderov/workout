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
      @showForm="shouldShowForm = true"
    >
    </training-program-form>

    <the-wrapper
      :showWrapper="showWrapper"
    >
    </the-wrapper>

  </div>
</template>

<script>
import TrainingProgram from './components/TrainingProgram.vue';
import TrainingProgramForm from './components/TrainingProgramForm.vue';

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
  computed: {
  },
  components: {
    TrainingProgram,
    TrainingProgramForm,
    TheWrapper,
  }
}
</script>

<style scoped>

</style>
