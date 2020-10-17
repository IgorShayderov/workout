<template>
  <div class="calendar-day">
    <p>
      No training plans
    </p>

    <training-plan-form
      :shouldShowForm="shouldShowForm"
    >
    </training-plan-form>

    <button
      class="btn btn-info"
      @click="addTrainingPlan"
    >
      Add training plan
    </button>
  </div>
</template>

<script>
import TrainingPlanForm from './TrainingPlanForm';

export default {
  props: {
    dayCount: {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {
      shouldShowForm: true,
    };
  },
  methods: {
    addTrainingPlan() {

    }
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