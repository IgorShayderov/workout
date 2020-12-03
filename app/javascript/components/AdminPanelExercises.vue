<template>
  <div class="exercises">
    <h1 class="text-center">Admin panel</h1>

    <table class="table exercises__list">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Location</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(exercise, index) in getExercises"
          :key="index"
          :data-exercise-id="exercise.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ exercise.title }}</td>
          <td>{{ exercise.location }}</td>
          <td>{{ exercise.image }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="updateExerciseForm(exercise.id)"
            >
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      class="btn btn-primary m-4"
      @click="openExerciseForm"
    >
      Add exercise
    </button>

    <admin-panel-exercise-form
      :shouldShowForm="shouldShowForm"
      @close-form="closeExerciseForm"
      :id="exerciseId || newExerciseId"
    >
    </admin-panel-exercise-form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import AdminPanelExerciseForm from './AdminPanelExerciseForm';

export default {
  beforeRouteEnter(to, from, next) {
    next((vueInstance) => {
      if (vueInstance.getExercises.length === 0) {
        vueInstance.loadExercises();
      }
    });
  },
  data() {
    return {
      newExerciseId: 0,
      shouldShowForm: false,
      exerciseId: null,
    };
  },
  methods: {
    ...mapActions('adminPanel',
        [ 'loadExercises' ],
    ),
    ...mapActions('system',
        [ 'showWrapper', 'hideWrapper' ],
    ),
    openExerciseForm() {
      this.shouldShowForm = true;
      this.showWrapper();
    },
    closeExerciseForm() {
      this.exerciseId = null;
      this.shouldShowForm = false;
      this.hideWrapper();
    },
    updateExerciseForm(exerciseId) {
      this.exerciseId = exerciseId;
      this.openExerciseForm();
    },
  },
  computed: {
    ...mapGetters('adminPanel',
        [ 'getExercises' ],
    ),
  },
  components: {
    AdminPanelExerciseForm,
  },
};
</script>

<style>

</style>
