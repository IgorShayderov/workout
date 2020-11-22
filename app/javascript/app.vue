<template>
  <div id="app">
    <the-navigation>
    </the-navigation>

    <router-view></router-view>

    <the-wrapper
      :showWrapper="getWrapperStatus"
    >
    </the-wrapper>
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

.form-wrapper {
  position: absolute;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 70vw;
  border-radius: 10px;
  z-index: 20;
  background: linear-gradient(to left, hsla(221, 42%, 28%, 1),
                                       hsla(247, 32%, 49%, 1),
                                       hsla(274, 48%, 59%, 1));
}

.form__btn-close {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}

.form__btn-submit {
  position: absolute;
  margin-bottom: 16px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

</style>
