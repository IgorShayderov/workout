<template>
  <div>
    <h1 class="text-center mb-4">
      Workout
    </h1>

    <div class="training-programs">
      <TrainingProgram
        v-for="trainingProgram in getTrainingPrograms"
        :key="trainingProgram.id"
        :trainingProgram="trainingProgram"
        :data-id="trainingProgram.id"
      />

      <TrainingProgram
        class="text-center"
        :title="'New program'"
      >
        <template v-slot:body>
          <a
            class="training-program_create"
            @click.prevent="showForm"
            href="new_training_program"
          >
            Make new program
          </a>
        </template>
      </TrainingProgram>

    </div>

    <TrainingProgramForm
      :shouldShowForm="shouldShowForm"
      @close-form="closeForm"
    />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TrainingProgram from './TrainingProgram';
import TrainingProgramForm from './TrainingProgramForm';

export default {
  data: function() {
    return {
      shouldShowForm: false,
    };
  },
  methods: {
    ...mapActions('system',
        ['showWrapper', 'hideWrapper'],
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
        ['getTrainingPrograms'],
    ),
  },
  components: {
    TrainingProgram,
    TrainingProgramForm,
  },
};
</script>

<style scoped>
.training-programs {
  display: flex;
  margin: 0 10px;
}

</style>
