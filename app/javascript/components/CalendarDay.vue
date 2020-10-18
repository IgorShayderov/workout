<template>
  <div class="calendar-day">
    <div class="calendar-day__training-plans">
      <p>
        No training plans
      </p>
    </div>

    <training-plan-form
      :shouldShowForm="shouldShowForm"
      @close_form="closeForm"
    >
    </training-plan-form>

    <button
      class="btn btn-info mt-2"
      @click="showForm"
    >
      Add training plan
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TrainingPlanForm from './TrainingPlanForm';

export default {
  props: {
    dayCount: {
      type: [String, Number],
      required: true,
    }
  },
  created() {
    // response
  },
  data() {
    return {
      shouldShowForm: false,
    };
  },
  methods: {
    ...mapActions('system',
      ['showWrapper', 'hideWrapper']
    ),
    showForm() {
      this.shouldShowForm = true;
      this.showWrapper();
    },
    closeForm() {
      this.shouldShowForm = false;
      this.hideWrapper();
    },
  },
  computed: {

  },
  components: {
    TrainingPlanForm,
  }
}
</script>

<style scoped>
.calendar-day {
  margin: 2vh 2vw;
}
</style>