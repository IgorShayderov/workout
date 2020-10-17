export default {
  props: {
    shouldShowForm: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      showErrors: false,
      errors: [],
    };
  },
  methods: {
    closeForm() {
      this.$emit('close_form');
      this.clearErrors();
    },
    clearForm() {
      this.title = '';
      this.description = '';
      this.location = '';
    },
    clearErrors() {
      this.errors = [];
      this.showErrors = false;
    },
  },
}
