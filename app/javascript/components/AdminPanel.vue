<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  beforeRouteEnter(to, from, next) {
    next(async (vueInstance) => {
      const isUserAdmin = await vueInstance.verifyUserIsAdmin();

      if (!isUserAdmin) {
        vueInstance.$router.push({ name: 'root' });
        vueInstance.$root.$emit('flash-message', 'You must be admin to be able to use admin panel');
      }
    });
  },
  computed: {
    ...mapGetters('system',
        [ 'getUserInfo' ],
    ),
  },
  methods: {
    ...mapActions('system',
        [ 'isUserAdmin' ],
    ),
    verifyUserIsAdmin() {
      return this.isUserAdmin()
          .then((isUserAdmin) => isUserAdmin);
    },
  },
};
</script>

<style>

</style>
