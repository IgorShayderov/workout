<template>
  <router-view></router-view>
</template>

<script>

export default {
  beforeRouteEnter(to, from, next) {
    next((vueInstance) => {
      // TODO check if user is admin
    });
  },
};
</script>

<style>

</style>
