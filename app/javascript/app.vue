<template>
  <div id="app">
      <FlashMessage
        :text="flashMessage"
        :shouldBeDisplayed="shouldShowFlashMessage"
        @hide-flash-message="hideFlashMessage"
      >
      </FlashMessage>

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

import FlashMessage from './components/FlashMessage';
import TheWrapper from './components/TheWrapper';
import TheNavigation from './components/TheNavigation';

export default {
  created() {
    this.$root.$on('flash-message', (message) => {
      this.showFlashMessage(message);
    });

    if (document.referrer.includes('/users/sign_in')) {
      window.setTimeout(() => {
        this.showFlashMessage('You have successfully logged in');
      }, 0);
    }

    // saving csrf-token into vuex
    const tokenNode = document.querySelector('meta[name=\'csrf-token\']');
    let token = '';

    if (tokenNode) {
      token = tokenNode.content;
    }

    this.saveToken(token);
  },
  data() {
    return {
      flashMessage: '',
      shouldShowFlashMessage: false,
    };
  },
  methods: {
    ...mapActions('system',
        [ 'saveToken' ],
    ),
    showFlashMessage(message) {
      this.flashMessage = message;
      this.shouldShowFlashMessage = true;
    },
    hideFlashMessage() {
      this.flashMessage = '';
      this.shouldShowFlashMessage = false;
    },
  },
  computed: {
    ...mapGetters('system',
        [ 'getWrapperStatus' ],
    ),
  },
  components: {
    FlashMessage,
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
