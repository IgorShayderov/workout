<template>
  <div class="toolbar">
    <span>{{ userWelcome }}</span>

    <a
      href="profile"
      @click.prevent="showProfile"
    >
      Profile
    </a>

    <a
      :href="getRootPath + 'users/sign_out'"
      data-method="delete"
    >
      Sign out
    </a>

    <a
      href="back"
      @click.prevent="goBack"
    >
      Back
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    goBack() {
      this.$router.push({ name: 'root' })
    },
    showProfile() {
      this.$router.push({ name: 'profile' })
    },
  },
  computed: {
    ...mapGetters('system',
      ['getRootPath', 'getUserInfo']
    ),
    userWelcome() {
      return `Welcome, ${this.getUserInfo.name}`;
    }
  },
}
</script>

<style scoped>
  .toolbar {
    padding: 5px;
  }
</style>
