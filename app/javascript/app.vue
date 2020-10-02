<template>
  <div id="app">
    <the-toolbar>
    </the-toolbar>

    <router-view></router-view>

    <the-wrapper
      :showWrapper="getWrapperStatus"
    >
    </the-wrapper>
  </div>
</template>

<script>
// document.referrer

import { mapGetters } from 'vuex';

import TheWrapper from './components/TheWrapper';
import TheToolbar from './components/TheToolbar';

export default {
  computed: {
    ...mapGetters('system',
      ['getWrapperStatus']
    )
  },
  components: {
    TheWrapper,
    TheToolbar,
  }
}
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
