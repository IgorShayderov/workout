<template>
  <div>
    <h1 class="text-center mb-4">
      Workout
    </h1>

    <div class="training-programs">
      <training-program
        v-for="(trainingProgram, index) in getTrainingPrograms"
        :key="index"
        :trainingProgram="trainingProgram"
        :data-id="trainingProgram.id"
      >
      </training-program>

      <training-program
        class="text-center"
        :title="'New program'"
      >
        <template
          v-slot:body
        >
          <a
            class="training-program_create"
            @click.prevent="showForm"
            href="new_training_program"
          >
            Make new program
          </a>
        </template>
      </training-program>

    </div>

    <training-program-form
      :shouldShowForm="shouldShowForm"
      @close_form="closeForm"
    >
    </training-program-form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TrainingProgram from './TrainingProgram';
import TrainingProgramForm from './TrainingProgramForm';

export default {
  props: {
  },
  data: function () {
    return {
      shouldShowForm: false,
    }
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
    }
  },
  computed: {
    ...mapGetters('trainingPrograms',
      ['getTrainingPrograms']
    ),
  },
  components: {
    TrainingProgram,
    TrainingProgramForm,
  }
}
</script>

<style scoped>
.training-programs {
  display: flex;
  margin: 0 10px;
}

</style>