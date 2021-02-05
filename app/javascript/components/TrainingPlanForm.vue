<template>
  <FormWrapper
    :errors="errors"
    :shouldShowForm="shouldShowForm"
    :submitTitle="'Assign training plan'"
    @submit-form="assignTrainingPlan"
    @close-form="closeForm"
  >
    <label>
      <p>Training program:</p>

      <select
        v-model="formData.selectedTrainingProgramId"
      >
        <option
          v-for="trainingProgram in trainingPrograms"
          :key="trainingProgram.id"
          :value="trainingProgram.id"
        >
          {{ trainingProgram.title }}
        </option>
      </select>
    </label>

    <br>

    <label>
      <p>Start time:</p>
      <input
        v-model="formData.startTime"
        type="time"
        name="start_time"
        required
      />
    </label>

    <br>

    <label>
      <p>End time:</p>
      <input
        v-model="formData.endTime"
        type="time"
        name="end_time"
        required
      />
    </label>

  </FormWrapper>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { splitTimeDate } from '../helpers/dates';

import formHelpers from '../mixins/formHelpers';

import FormWrapper from './shared/FormWrapper';

export default {
  mixins: [formHelpers],
  props: {
    dateInfo: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.trainingPrograms = this.getTrainingPrograms;
  },
  data() {
    return {
      formData: {
        trainingPrograms: [],
        selectedTrainingProgramId: '',
        startTime: '',
        endTime: '',
      },
    };
  },
  methods: {
    ...mapActions('trainingPrograms',
        ['saveTrainingPlan'],
    ),
    calcDateFromTime(time) {
      const { year, month, day } = this.dateInfo;
      const { hours, minutes } = splitTimeDate(time);

      return new Date(year, month - 1, day, hours, minutes);
    },
    assignTrainingPlan() {
      if (!this.formData.selectedTrainingProgramId) {
        this.errors = {
          training_program: ['can\'t be blank'],
        };
      } else {
        const timeData = {
          start_time: this.formData.startTime ? this.calcDateFromTime(this.formData.startTime) : null,
          end_time: this.formData.endTime ? this.calcDateFromTime(this.formData.endTime) : null,
        };

        this.saveTrainingPlan({
          trainingPlanData: timeData,
          trainingProgramId: this.formData.selectedTrainingProgramId,
        })
            .then(
                () => {
                  this.clearErrors();
                  this.clearForm();
                  this.closeForm();
                },
                (errors) => {
                  this.errors = errors;
                },
            );
      }
    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
        ['getTrainingPrograms'],
    ),
  },
  components: {
    FormWrapper,
  },
};
</script>

<style scoped>

</style>
