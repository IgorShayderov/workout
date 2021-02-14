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
          {{ trainingInfo(trainingPlan) }}
        </li>
      </ol>
    </div>

    <TrainingPlanForm
      :shouldShowForm="shouldShowForm"
      @close-form="closeForm"
      :dateInfo="dateInfo"
    />

    <button
      data-test-id="add-training-plan-btn"
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
    if (this.trainingPlans.length === 0) {
      this.loadTrainingPlans({ year: this.year, month: this.month, day: this.day });
    }
  },
  data() {
    return {
      shouldShowForm: false,
    };
  },
  methods: {
    ...mapActions('system',
        ['showWrapper', 'hideWrapper'],
    ),
    ...mapActions('trainingPrograms',
        ['loadTrainingPlans'],
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
        ['getTrainingPlansByDate', 'getTrainingProgramById'],
    ),
    trainingPlans() {
      return this.getTrainingPlansByDate(this.year, this.month, this.day);
    },
    dateInfo() {
      return {
        day: this.day,
        month: this.month,
        year: this.year,
      };
    },
    trainingProgramTitle(trainingProgramId) {
      return (trainingProgramId) => {
        return this.getTrainingProgramById(trainingProgramId).title;
      };
    },
    getTime(dateStr) {
      return (dateStr) => {
        const date = new Date(dateStr);
        const hours = date.getHours();
        let minutes = date.getMinutes().toString(10);

        if (minutes.length === 1) {
          minutes += '0';
        }

        return `${hours}:${minutes}`;
      };
    },
    trainingInfo() {
      return (trainingPlan) => {
        const startTime = this.getTime(trainingPlan.start_time);
        const endTime = this.getTime(trainingPlan.end_time);
        const title = this.trainingProgramTitle(trainingPlan.training_program_id);

        return `${startTime} - ${endTime} ${title}`;
      };
    },
  },
  components: {
    TrainingPlanForm,
  },
};
</script>

<style scoped>
.calendar-day {
  margin: 2vh 2vw;
}
</style>
