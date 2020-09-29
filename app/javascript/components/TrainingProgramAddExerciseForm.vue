<template>
  <div>
    <div
      class="training-program-form_wrapper"
      v-show="shouldShowForm"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shouldShowForm: {
      type: Boolean,
      // required: true,
    }
  }
}
</script>

<style>

</style>
