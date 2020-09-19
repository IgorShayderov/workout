<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import TrainingProgram from './components/TrainingProgram.vue';

export default {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  },
  components: {
    TrainingProgram,
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
