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
          {{ selectedExercise }}
        </li>
      </ol>

      <button class="btn btn-info">Confirm</button>
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
      if (vm.selectedExercises.length === 0) {
        const loadedExercises = vm.loadTrainingProgramExercises(vm.trainingProgramId);

        vm.selectedExercises = loadedExercises;
      }
    });
  },
  props: {
    trainingProgramId: {
      type: String,
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
      ['addAvailableExercises', 'loadTrainingProgramExercises']
    ),
    addExerciseToList(exerciseId) {
      console.log('add exercise');
      const exerciseToAdd = getAvailableExerciseById(exerciseId);

      this.selectedExercises.push(exerciseToAdd);
      console.log(this.selectedExercises, 'selected');
    },
    removeExerciseFromList(event) {
      console.log('remove exercise');
      console.log(event);
    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
      ['getAvailableExercises', 'getAvailableExerciseById']
    ),
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

.picked-exercises {
  margin: 0 2vw;
}
</style>
