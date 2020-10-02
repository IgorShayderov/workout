<template>
  <div class="user-profile">
    {{ getUserInfo }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    
  },
  computed: {
    ...mapGetters('system',
      ['getUserInfo']
    ),
  }
}
</script>

<style scoped>
  .user-profile {

  }
</style>
