<template>
  <div
    class="form-wrapper"
    v-show="shouldShowForm"
  >
    <form
      class="form m-4"
    >

      <div
        class="form__btn-close"
        @click="$emit('close-form')"
      >
        <i class="far fa-2x fa-times-circle"></i>
      </div>

      <slot></slot>

      <button
        class="btn btn-info form__btn-submit"
        @click.prevent="$emit('submit-form')"
      >
        {{ submitTitle }}
      </button>

      <ErrorsViewer
        :errors="errors"
      >
      </ErrorsViewer>
    </form>
  </div>
</template>

<script>
import ErrorsViewer from '../ErrorsViewer';

export default {
  props: {
    shouldShowForm: {
      type: Boolean,
    },
    errors: {
      type: [Array, Object],
      required: true,
    },
    submitTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
  },
  components: {
    ErrorsViewer,
  },
};
</script>

<style scoped>
.form-wrapper {
  position: fixed;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 70vw;
  border-radius: 10px;
  z-index: 20;
  background: linear-gradient(
    to left,
    hsla(221, 42%, 28%, 1),
    hsla(247, 32%, 49%, 1),
    hsla(274, 48%, 59%, 1)
  );
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
