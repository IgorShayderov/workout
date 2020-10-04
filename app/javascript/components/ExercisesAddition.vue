<template>
  <div
    class="exercises-addition"
  >
    <h1 class="text-center">Exercises</h1>

    <div class="exercises-slider">

        <div class="exercises-slider__roll-previous">
            <i class="fas fa-arrow-left fa-4x"></i>
        </div>

        <div class="exercises-list">
          <exercise-view
            v-for="(exercise, index) in getAvailableExercises"
            :key="index"
            :title="exercise.title"
            :id="exercise.id"
            :data-id="exercise.id"
            @selected_exercise="addExerciseToList"
            @unselected_exercise="removeExerciseFromList"
          >
          </exercise-view>
        </div>

        <div class="exercises-slider__roll-next">
          <i class="fas fa-arrow-right fa-4x"></i>
        </div>

    </div>

    <div class="picked-exercises">
      <h2>Picked exercises</h2>

      <ol class="picked-exercises__list">
        <li
          v-for="(selectedExercise, index) in selectedExercises"
          :key="index"
        >
          {{ selectedExercise.title }}
        </li>
      </ol>

      <button
        class="btn btn-info"
        :disabled="!this.selectedExercises.length"
        @click="saveExercises"
      >
        Confirm
      </button>
    </div>

    <div class="program-exercises">
      <h2>Program exercises</h2>

      <ol>
        <li
          v-for="(exercise, index) in trainingProgramExercises"
          :key="index"
        >
          {{ exercise.title }}
        </li>
      </ol>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ExerciseView from './ExerciseView';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.getAvailableExercises.length === 0) {
        vm.addAvailableExercises(vm.trainingProgramId);
      }

      vm.loadTrainingProgramExercises(vm.trainingProgramId);
    });
  },
  props: {
    trainingProgramId: {
      type: Number|String,
      required: true,
    },
  },
  data() {
    return {
      selectedExercises: [],
    };
  },
  methods: {
    ...mapActions('trainingPrograms',
      ['addAvailableExercises', 'loadTrainingProgramExercises', 'processTrainingProgramExercises']
    ),
    addExerciseToList(exerciseId) {
      const exerciseToAdd = this.getAvailableExerciseById(exerciseId);

      this.selectedExercises.push(exerciseToAdd);
    },
    removeExerciseFromList(exerciseId) {
      const exerciseIndex = this.selectedExercises.findIndex((exercise) => exercise.id === exerciseId);

      this.selectedExercises.splice(exerciseIndex, 1);
    },
    saveExercises() {
      this.processTrainingProgramExercises({
        trainingProgramId: this.trainingProgramId,
        exercises: this.selectedExercises,
      });
    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
      ['getTrainingProgramById', 'getAvailableExercises', 'getAvailableExerciseById']
    ),
    trainingProgramExercises() {
      const trainingProgram = this.getTrainingProgramById(this.trainingProgramId);

      if (trainingProgram.hasOwnProperty('exercises')) {
        return trainingProgram.exercises
      }

      return [];
    }
  },
  components: {
    ExerciseView,
  },
}
</script>

<style scoped>
.exercises-slider {
  display: flex;
  justify-content: space-between;
  margin: 2vh auto;
  width: 80%;
}

.exercises-list {
  display: flex;
  /* overflow: hidden; */
}

.exercises-slider__roll-next,
.exercises-slider__roll-previous {
  align-self: center;
  margin: 0 2vw;
  cursor: pointer;
}

.picked-exercises, .program-exercises {
  margin: 0 2vw;
}
</style>
