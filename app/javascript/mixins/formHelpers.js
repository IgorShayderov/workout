export default {
  props: {
    shouldShowForm: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    closeForm() {
      this.$emit('close-form');
      this.clearErrors();
    },
    clearForm() {
      Object.keys(this.formData).map((field) => {
        switch (typeof field) {
          case 'string':
            field = '';
            break;
          case 'number':
            field = 0;
            break;
          case 'object':
            if (Array.isArray(field)) {
              field = [];
            } else {
              field = {};
            }
            break;
          default:
            console.log('Unhandled type of the field.');
        }
      });
    },
    clearErrors() {
      this.errors = [];
    },
  },
};
