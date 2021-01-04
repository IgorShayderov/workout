<template>
  <div id="app">
    <TheNavigation>
    </TheNavigation>

    <router-view></router-view>

    <TheWrapper
      :showWrapper="getWrapperStatus"
    >
    </TheWrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TheWrapper from './components/TheWrapper';
import TheNavigation from './components/TheNavigation';

export default {
  created() {
    console.log(document.referrer, 'referrer');
    // '/users/sign_in'

    // saving csrf-token into vuex
    const tokenNode = document.querySelector('meta[name=\'csrf-token\']');
    let token = '';

    if (tokenNode) {
      token = tokenNode.content;
    }

    this.saveToken(token);
  },
  methods: {
    ...mapActions('system',
        [ 'saveToken' ],
    ),
  },
  computed: {
    ...mapGetters('system',
        [ 'getWrapperStatus' ],
    ),
  },
  components: {
    TheWrapper,
    TheNavigation,
  },
};
</script>

<style lang="scss">
$highlight-color: hsla(311, 98%, 34%, 1);

p {
  margin: 0;
}

a {
  color: $highlight-color;
  font-weight: bold;
}

</style>
