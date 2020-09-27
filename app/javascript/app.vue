<template>
  <div id="app">
    <h1 class="text-center">
      Workout
    </h1>

    <training-program
      v-for="(trainingProgram, index) in getTrainingPrograms"
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
import { mapGetters } from 'vuex';

import TrainingProgram from './components/TrainingProgram';
import TrainingProgramForm from './components/TrainingProgramForm';
import TheWrapper from './components/TheWrapper';

export default {
  props: {
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
    ...mapGetters('trainingPrograms',
      ['getTrainingPrograms']
    )
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
