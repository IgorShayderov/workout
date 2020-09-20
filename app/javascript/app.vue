<template>
  <div id="app">
    <p>{{ message }}</p>

    <training-program
      v-for="(program, index) in programs"
      :key="index"
    >
    </training-program>

    <training-program-form>
    </training-program-form>

    <a href="#">Create new program</a>

  </div>
</template>

<script>
import TrainingProgram from './components/TrainingProgram.vue';
import TrainingProgramForm from './components/TrainingProgramForm.vue';

export default {
  data: function () {
    return {
      message: "Training programs!",
      programs: [],
    }
  },
  components: {
    TrainingProgram,
    TrainingProgramForm,
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
