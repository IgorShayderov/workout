<template>
  <div class="toolbar">
    <!-- TODO message with greeting should be showed only while user just logged in FlashMessage component -->

    <a
      class="toolbar__link"
      href="root"
      @click.prevent="showRoot"
    >
      Root
    </a>

    <a
      class="toolbar__link"
      href="calendar"
      @click.prevent="showCalendar"
    >
      Calendar
    </a>

    <a
      class="toolbar__link"
      href="profile"
      @click.prevent="showProfile"
    >
      Profile
    </a>

    <a
      v-if="getUserInfo.admin"
      class="toolbar__link"
      href="admin-panel"
      @click.prevent="showAdminPanel"
    >
      Admin panel
    </a>


    <a
      class="toolbar__link"
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
    showRoot() {
      this.$router.push({ name: 'root' });
    },
    showProfile() {
      this.$router.push({ name: 'profile' });
    },
    showCalendar() {
      this.$router.push({ name: 'calendar' });
    },
    showAdminPanel() {
      this.$router.push({ name: 'adminPanelExercises' });
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
