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

    <div
      class="app-wrapper"
      v-show="showWrapper"
    >
    </div>

  </div>
</template>

<script>
import TrainingProgram from './components/TrainingProgram.vue';
import TrainingProgramForm from './components/TrainingProgramForm.vue';

export default {
  data: function () {
    return {
      showWrapper: false,
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
.app-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
}

p {
  font-size: 2em;
  text-align: center;
}
</style>
