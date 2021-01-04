<template>
  <div
    class="training-program"
    @click="addExercises"
  >
    <h5 class="training-program__title">
      {{ title || trainingProgram.title }}
    </h5>

    <slot name="body"></slot>

    <div
      v-if="trainingProgram"
      class="training-program-info"
    >
      <p class="text-center">
        Location: {{ trainingProgram.location }}
      </p>

      <!-- количество упражнений -->
      <p class="text-center">
        Exercises: {{ countTrainingProgramExercises }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trainingProgram: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  created() {
    // console.log('trainingProgram', this.trainingProgram);
  },
  methods: {
    addExercises() {
      if (this.trainingProgram) {
        this.$router.push({
          name: 'trainingProgramExercises',
          params: { trainingProgramId: this.trainingProgram.id },
        });
      }
    },
  },
  computed: {
    countTrainingProgramExercises() {
      return this.trainingProgram.exercises.length || 'No';
    },
  },
};
</script>

<style scoped>
.training-program {
  border: 1px solid black;
  height: 100px;
  width: 200px;
  margin: 0 10px;
  border-radius: 10px;
}

.training-program__title {
  text-align: center;
  border-bottom: 1px dashed black;
}
</style>
