<template>
  <div class="toolbar">
    <span>{{ userWelcome }}</span>

    <a
      :href="getRootPath + 'users/sign_out'"
      data-method="delete"
    >
      Sign out
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {

  },
  computed: {
    ...mapGetters('system',
      ['getRootPath', 'getUserInfo']
    ),
    userWelcome() {
      return `Welcome, ${this.getUserInfo.email}`;
    }
  },
}
</script>

<style scoped>
  .toolbar {
    padding: 5px;
  }
</style>
