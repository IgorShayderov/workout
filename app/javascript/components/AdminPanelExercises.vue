<template>
  <div>
    <h1 class="text-center">Admin panel</h1>

    <table class="table">
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
      @click="goToExerciseForm"
    >
      Add exercise
    </button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  beforeRouteEnter(to, from, next) {
    next((vueInstance) => {
      if (vueInstance.getExercises.length === 0) {
        vueInstance.loadExercises();
      }
    });
  },
  methods: {
    ...mapActions('adminPanel',
        [ 'loadExercises' ],
    ),
    goToExerciseForm() {

    },
  },
  computed: {
    ...mapGetters('adminPanel',
        [ 'getExercises' ],
    ),
  },
};
</script>

<style>

</style>
