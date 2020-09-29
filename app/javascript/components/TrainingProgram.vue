<template>
  <div
    class="training-program"
  >
    <h5 class="training-program_title">
      {{ title || trainingProgram.title }}
    </h5>

    <slot name="body"></slot>

    <div
      v-if="trainingProgram"
      class="training-program-info"
    >
      <p
        class="text-center"
      >
        Location: {{ trainingProgram.location }}
      </p>

      <!-- количество упражнений -->
      <p
        class="text-center"
      >
        No exercises yet
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
  }
}
</script>

<style scoped>
.training-program {
  border: 1px solid black;
  height: 100px;
  width: 200px;
  margin: 0 10px;
  border-radius: 10px;
}

.training-program_title {
  text-align: center;
  border-bottom: 1px dashed black;
}
</style>
