<template>
  <div id="app">
    <h1 class="text-center mb-4">
      Workout
    </h1>

    <div class="training-programs">
      <training-program
        v-for="(trainingProgram, index) in getTrainingPrograms"
        :key="index"
        :trainingProgram="trainingProgram"
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
            @click.prevent="showCreateForm"
            href="#"
          >
            Make new program
          </a>
        </template>
      </training-program>

    </div>

    <training-program-create-form
      :shouldShowForm="shouldShowCreateForm"
      @closeForm="closeCreateForm"
    >
    </training-program-create-form>

    <training-program-add-exercise-form
      :shouldShowForm="shouldShowExerciseForm"
    >
    </training-program-add-exercise-form>

    <the-wrapper
      :showWrapper="showWrapper"
    >
    </the-wrapper>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TrainingProgram from './components/TrainingProgram';
import TrainingProgramCreateForm from './components/TrainingProgramCreateForm';
import TrainingProgramAddExerciseForm from './components/TrainingProgramAddExerciseForm';
import TheWrapper from './components/TheWrapper';

export default {
  props: {
  },
  data: function () {
    return {
      showWrapper: false,
      shouldShowCreateForm: false,
      shouldShowExerciseForm: true,
    }
  },
  methods: {
    showCreateForm() {
      this.shouldShowCreateForm = true;
      this.showWrapper = true;
    }, 
    closeCreateForm() {
      this.shouldShowCreateForm = false;
      this.showWrapper = false;
    }
  },
  computed: {
    ...mapGetters('trainingPrograms',
      ['getTrainingPrograms']
    )
  },
  components: {
    TrainingProgram,
    TrainingProgramCreateForm,
    TrainingProgramAddExerciseForm,
    TheWrapper,
  }
}
</script>

<style>
p {
  margin: 0;
}

.training-program-form_wrapper {
  position: absolute;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 70vw;
  border-radius: 10px;
  z-index: 20;
  background: linear-gradient(to left, hsla(221, 42%, 28%, 1),
                                       hsla(247, 32%, 49%, 1),
                                       hsla(274, 48%, 59%, 1));
}

.training-programs {
  display: flex;
  margin: 0 10px;
}

.training-program_create {
  margin: auto;
  cursor: pointer;
}

</style>
