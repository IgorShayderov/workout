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
          <ExerciseView
            v-for="(exercise, index) in getExercises"
            :key="index"
            :title="exercise.title"
            :id="exercise.id"
            :data-id="exercise.id"
            @selected-exercise="addExerciseToList"
            @unselected-exercise="removeExerciseFromList"
          >
          </ExerciseView>
        </div>

        <div class="exercises-slider__roll-next">
          <i class="fas fa-arrow-right fa-4x"></i>
        </div>

    </div>

    <ErrorsViewer
      :showErrors="showErrors"
      :errors="errors"
    >
    </ErrorsViewer>

    <div class="exercises">
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

    <TrainingProgramComments
      :trainingProgramId="trainingProgramId.toString()"
      @comment-error="handleCommentError($event)"
      @clear-errors="clearErrors"
    >
    </TrainingProgramComments>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ExerciseView from './ExerciseView';
import ErrorsViewer from './ErrorsViewer';
import TrainingProgramComments from './TrainingProgramComments';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.getExercises.length === 0) {
        vm.loadExercises();
      }

      if (vm.trainingProgramExercises.length === 0) {
        vm.loadTrainingProgramExercises(vm.trainingProgramId);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.clearErrors();
    next();
  },
  props: {
    trainingProgramId: {
      type: [ Number, String ],
      required: true,
    },
  },
  data() {
    return {
      selectedExercises: [],
      showErrors: false,
      errors: [],
    };
  },
  methods: {
    ...mapActions('trainingPrograms',
        [ 'loadTrainingProgramExercises', 'processTrainingProgramExercises' ],
    ),
    ...mapActions('adminPanel',
        [ 'loadExercises' ],
    ),
    handleCommentError(errors) {
      this.errors = errors;
      this.showErrors = true;
    },
    clearErrors() {
      this.errors = [];
      this.showErrors = false;
    },
    addExerciseToList(exerciseId) {
      const exerciseToAdd = this.getExerciseById(exerciseId);

      this.selectedExercises.push(exerciseToAdd);
    },
    removeExerciseFromList(exerciseId) {
      const exerciseIndex = this.selectedExercises.findIndex((exercise) => exercise.id === exerciseId);

      this.selectedExercises.splice(exerciseIndex, 1);
    },
    clearSelectedExercisesList() {
      const selectedExercisesNodes = document.querySelectorAll('.training-program-exercise_selected');

      selectedExercisesNodes.forEach((selectedExerciseNode) => {
        selectedExerciseNode.classList.remove('training-program-exercise_selected');
      });

      this.selectedExercises = [];
    },
    saveExercises() {
      this.clearErrors();

      const exercises = this.selectedExercises.map((selectedExercise) => {
        return {
          exercise_id: selectedExercise.id,
        };
      });

      this.processTrainingProgramExercises({
        trainingProgramId: this.trainingProgramId,
        exercises,
      })
          .then((data) => {
            if (data.errors) {
              this.errors = data.errors;
              this.showErrors = true;
            }

            this.clearSelectedExercisesList();
          });
    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
        [ 'getTrainingProgramById', 'getAvailableExercises', 'getAvailableExerciseById' ],
    ),
    ...mapGetters('adminPanel',
        [ 'getExercises', 'getExerciseById' ],
    ),
    trainingProgramExercises() {
      const trainingProgram = this.getTrainingProgramById(this.trainingProgramId);

      if (trainingProgram.exercises) {
        return trainingProgram.exercises;
      }

      return [];
    },
  },
  components: {
    ExerciseView,
    ErrorsViewer,
    TrainingProgramComments,
  },
};
</script>

<style scoped>
.exercises-slider {
  display: flex;
  justify-content: space-between;
  margin: 2vh;
  width: 500px;
  min-width: 500px;
}

.exercises-list {
  display: flex;
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
