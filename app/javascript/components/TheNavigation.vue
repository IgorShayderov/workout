<template>
  <div class="toolbar">
    <a
      class="toolbar__link"
      href="root"
      @click.prevent="navigateTo('root')"
    >
      Root
    </a>

    <a
      class="toolbar__link"
      href="calendar"
      @click.prevent="navigateTo('calendar')"
    >
      Calendar
    </a>

    <a
      class="toolbar__link"
      href="profile"
      @click.prevent="navigateTo('profile')"
    >
      Profile
    </a>

    <a
      v-if="getUserInfo.admin"
      class="toolbar__link"
      href="admin-panel"
      @click.prevent="navigateTo('adminPanelExercises')"
    >
      Admin panel
    </a>


    <a
      class="toolbar__link"
      :href="`${getRootPath}users/sign_out`"
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
    navigateTo(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name });
      }
    },
  },
  computed: {
    ...mapGetters('system',
        [ 'getRootPath', 'getUserInfo' ],
    ),
  },
};
</script>

<style scoped>
  .toolbar {
    padding: 5px;
  }

  .toolbar__link {
    padding: 5px;
    border-radius: 5px;
    margin: 0 5px;
  }
</style>
