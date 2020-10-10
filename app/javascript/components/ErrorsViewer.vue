<template>
  <div
    v-show="showErrors"
    class="errors-viewer alert alert-danger"
  >
    <h4>Errors encountered:</h4>
    <div
      class="errors-viewer_errors"
      v-html="handledErrors"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showErrors: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: [Object, Array]
    }
  },
  computed: {
    handleErrorsArray() {
      return (errors) => {
        return errors.join('<br>');
      }
    },
    handleErrorsObject() {
      return (errors) => {
          return Object.keys(errors).reduce((finalMessage, errorKey) => {
            finalMessage += `${errorKey[0].toUpperCase() + errorKey.substring(1)} `;

            errors[errorKey].forEach((errorMessage) => {
              finalMessage += `${errorMessage}<br>`;
            });

            return finalMessage;
          }, '');
      }
    },
    handledErrors() {
      if (Array.isArray(this.errors) && this.errors.length > 0) {
        return this.handleErrorsArray(this.errors);
      } else {
        return this.handleErrorsObject(this.errors);
      }

      return 'No errors';
    }
  }
}
</script>

<style scoped>

</style>