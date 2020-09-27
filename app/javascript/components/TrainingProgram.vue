<template>
  <div
    class="training-program"
  >
    {{ trainingProgram.title }}
  </div>
</template>

<script>
export default {
  props: {
    trainingProgram: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.training-program {
  display: inline-block;
  border: 1px solid black;
  height: 100px;
  width: 100px;
  margin-left: 20px;
}
</style>