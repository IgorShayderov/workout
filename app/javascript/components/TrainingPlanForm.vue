<template>
  <div
    class="form-wrapper"
    v-show="shouldShowForm"
  >
    <form
      class="m-4"
    >

      <div
        class="form__btn-close"
        @click="closeForm"
      >
          <i class="far fa-2x fa-times-circle"></i>
      </div>

      <label>
        <p>Training program:</p>

        <select
          v-model="selectedTrainingProgramId"
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
          v-model="startTime"
          type="time"
          name="start_time"
          required
        />
      </label>

      <br>

      <label>
        <p>End time:</p>
        <input
          v-model="endTime"
          type="time"
          name="end_time"
          required
        />
      </label>

      <br>

      <button
        class="btn btn-info form__btn-submit"
        @click.prevent="assignTrainingPlan"
      >
        Assign training plan
      </button>

      <errors-viewer
        :showErrors="showErrors"
        :errors="errors"
      >
      </errors-viewer>

    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { splitHoursDate } from '../helpers/dates';

import formHelpers from '../mixins/formHelpers';

import ErrorsViewer from './ErrorsViewer';

export default {
  mixins: [formHelpers],
  props: {
    dateInfo: {
      type: Object,
      required: true,
    }
  },
  created() {
    this.trainingPrograms = this.getTrainingPrograms;
  },
  data() {
    return {
      trainingPrograms: [],
      selectedTrainingProgramId: '',
      startTime: '',
      endTime: '',
    }
  },
  methods: {
    ...mapActions('trainingPrograms',
      ['saveTrainingPlan']
    ),
    calcDateFromTime(time) {
      const { year, month, day } = this.dateInfo;
      const { hours, minutes } = splitHoursDate(time);

      return new Date(year, month, day, hours, minutes);
    },
    assignTrainingPlan() {
      if (!this.selectedTrainingProgramId) {
        this.errors = {
          training_program: ["can't be blank"],
        };
        this.showErrors = true;
      } else {
        const { year, month, day } = this.dateInfo;
        const data = {
          start_time: this.startTime ? this.calcDateFromTime(this.startTime) : null,
          end_time: this.endTime ? this.calcDateFromTime(this.endTime) : null,
        };
        console.log(this.startTime, 'this.startTime');
        console.log(this.calcDateFromTime(this.startTime));
        console.log(this.endTime, 'this.endTime');
        console.log(this.calcDateFromTime(this.endTime));

        this.saveTrainingPlan({
          trainingPlanData: data,
          trainingProgramId: this.selectedTrainingProgramId,
          year,
          month,
          day,
        })
        .then(
          () => {
            this.clearErrors();
            this.clearForm();
            this.closeForm();
        },
          (errors) => {
            this.errors = errors;
            this.showErrors = true;
          }
        );
      }
    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
      ['getTrainingPrograms']
    ),
  },
  components: {
    ErrorsViewer,
  }
}
</script>

<style scoped>

</style>