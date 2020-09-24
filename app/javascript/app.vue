<template>
  <div id="app" data-training-programs="">
    <p>{{ message }}</p>

    <training-program
      v-for="(trainingProgram, index) in trainingPrograms"
      :key="index"
      :trainingProgram="trainingProgram"
    >
    </training-program>

    <training-program-form>
    </training-program-form>

    <a href="#">New program</a>

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
  props: {
      trainingPrograms: {
        type: Array,
        required: true,
      },
  },
  data: function () {
    return {
      showWrapper: false,
      message: "Training programs!",
    }
  },
  computed: {
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
