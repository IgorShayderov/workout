<template>
  <div
    class="app-wrapper"
    v-show="showWrapper"
  >
  </div>
</template>

<script>
export default {
  props: {
    showWrapper: {
      type: Boolean,
      required: true,
    }
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
</style>