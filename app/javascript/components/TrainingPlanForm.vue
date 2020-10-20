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
    </form>

    <errors-viewer
      :showErrors="showErrors"
      :errors="errors"
    >
    </errors-viewer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    assignTrainingPlan() {
      const { year, month, day } = this.dateInfo;
      const separatedStartTime = splitHoursDate(this.startTime);
      const separatedEndTime = splitHoursDate(this.endTime);
      const data = {
        start_time: new Date(year, month, day, separatedStartTime.hours, separatedStartTime.minutes),
        end_time: new Date(year, month, day, separatedEndTime.hours, separatedEndTime.minutes),
      };

      this.selectedTrainingProgramId;


    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
      ['getTrainingPrograms']
    )
  },
  components: {
    ErrorsViewer,
  }
}
</script>

<style scoped>

</style>