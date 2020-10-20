<template>
  <div class="calendar-day">
    <div class="calendar-day__training-plans">
      <p v-if="trainingPlans.length === 0">
        No training plans
      </p>

      <ol v-else>
        <li
          v-for="trainingPlan in trainingPlans"
          :key="trainingPlan.id"
        >
          {{ trainingPlan.id }}
        </li>
      </ol>
    </div>

    <training-plan-form
      :shouldShowForm="shouldShowForm"
      @close_form="closeForm"
      :dateInfo="dateInfo"
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
    day: {
      type: [String, Number],
      required: true,
    },
    month: {
      type: [String, Number],
      required: true,
    },
    year: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    this.loadTrainingPlans({ year: this.year, month: this.month, day: this.day });
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
    ...mapActions('trainingPrograms',
      ['loadTrainingPlans']
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
    ...mapGetters('trainingPrograms',
      ['getTrainingPlansByDate']
    ),
    trainingPlans() {
      return this.getTrainingPlansByDate(this.year, this.month, this.day);
    },
    dateInfo() {
      return {
        day: this.day,
        month: this.month,
        year: this.year,
      }
    },
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