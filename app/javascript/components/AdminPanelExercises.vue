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
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(exercise, index) in getExercises"
          :key="index"
        >
          <td>{{ index }}</td>
          <td>{{ exercise.title }}</td>
          <td>{{ exercise.location }}</td>
          <td>{{ exercise.image }}</td>
        </tr>
      </tbody>
    </table>

    <button
      class="btn btn-primary ml-4"
      @click="openExerciseForm"
    >
      Add exercise
    </button>

    <admin-panel-exercise-form
      :shouldShowForm="shouldShowForm"
      @close-form="closeExerciseForm"
      :id="newExerciseId"
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
      this.shouldShowForm = false;
      this.hideWrapper();
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
