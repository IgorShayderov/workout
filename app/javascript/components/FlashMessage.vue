<template>
  <transition name="show-message">

    <div
      v-show="shouldBeDisplayed"
      class="flash-message"
    >
      <p class="flash-message__content">{{ text }}</p>
    </div>

  </transition>

</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    shouldBeDisplayed: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    shouldBeDisplayed(flag) {
      if (flag) {
        this.closeAfterTimeout();
      }
    },
  },
  methods: {
    closeAfterTimeout(timeout = 5000) {
      window.setTimeout(() => {
        this.$emit('hide-flash-message');
      }, timeout);
    },
  },
};
</script>

<style scoped>
.flash-message {
  background-color:  hsla(274, 48%, 59%, 1);
  color: white;
  width: 300px;
  height: 100px;
  border: 1px dashed white;
  border-radius: 10px;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
}

.flash-message__content {
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  text-align: center;
}

/* transition */
.show-message-enter {
  top: -100px;
}

.show-message-enter-active {
  transition: top 0.9s;
  position: absolute;
}

.show-message-enter-to {
  top: 1%;
}

.show-message-leave-active {
  transition: opacity 0.6s;
  position: absolute;
}

.show-message-leave-to {
  opacity: 0;
}
</style>
