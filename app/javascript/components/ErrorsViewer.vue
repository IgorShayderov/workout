<template>
  <div
    v-show="shouldShowErrors"
    class="errors-viewer alert alert-danger"
  >
    <h4>Errors encountered:</h4>
    <div
      class="errors-viewer__errors"
      v-html="handledErrors"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: [ Object, Array ],
      required: true,
    },
  },
  computed: {
    shouldShowErrors() {
      if (Array.isArray(this.errors)) {
        return this.errors.length;
      }

      return Object.keys(this.errors).length;
    },
    handleErrorsArray() {
      return (errors) => {
        return errors.join('<br>');
      };
    },
    handleErrorsObject() {
      return (errors) => {
        return Object.keys(errors).reduce((finalMessage, errorKey) => {
          finalMessage += `${errorKey[0].toUpperCase() + errorKey.substring(1).replace('_', ' ')} `;

          errors[errorKey].forEach((errorMessage) => {
            finalMessage += `${errorMessage}<br>`;
          });

          return finalMessage;
        }, '');
      };
    },
    handledErrors() {
      if (Array.isArray(this.errors) && this.errors.length > 0) {
        return this.handleErrorsArray(this.errors);
      }

      return this.handleErrorsObject(this.errors);
    },
  },
};
</script>

<style scoped>
.errors-viewer {
  margin: 2vh 0;
}
</style>
