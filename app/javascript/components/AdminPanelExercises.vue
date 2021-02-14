<template>
  <div class="exercises">
    <h1 class="text-center">Admin panel</h1>

    <table class="table exercises__list">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>
            Title

            <input
              class="ml-2"
              v-model="searchFilter"
              type="text"
              placeholder="Search exercises..."
              test_id="search-input"
            >
          </th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>

      <transition-group name="mild-float" tag="tbody">
        <tr
          clas="exercise-row"
          v-for="(exercise, index) in filteredExercises"
          :key="exercise.id"
          :data-exercise-id="exercise.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ exercise.title }}</td>
          <td class="text-center">
            <button
              class="btn btn-primary"
              @click="updateExerciseForm(exercise.id)"
            >
              Update
            </button>

            <button
              class="btn btn-danger"
              @click="deleteExercise(exercise.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </transition-group>
    </table>

    <button
      class="btn btn-primary m-4"
      @click="openExerciseForm"
    >
      Add exercise
    </button>

    <AdminPanelExerciseForm
      :shouldShowForm="shouldShowForm"
      @close-form="closeExerciseForm"
      :id="exerciseId || newExerciseId"
    >
    </AdminPanelExerciseForm>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// TODO файл должен появляться в форме, если фото прикреплено
import AdminPanelExerciseForm from './AdminPanelExerciseForm';

export default {
  beforeRouteEnter(to, from, next) {
    next((vueInstance) => {
      if (vueInstance.getExercises.length === 0) {
        vueInstance.loadExercises();
      }
    });
  },
  inject: ['verifyUserIsAdmin'],
  data() {
    return {
      newExerciseId: 0,
      shouldShowForm: false,
      exerciseId: null,
      searchFilter: '',
    };
  },
  methods: {
    ...mapActions('adminPanel',
        ['loadExercises', 'deleteExercise'],
    ),
    ...mapActions('system',
        ['showWrapper', 'hideWrapper', 'getRootPath'],
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
    applySearchFilter(newFilter) {
      this.searchFilter = newFilter;
    },
  },
  computed: {
    ...mapGetters('adminPanel',
        ['getExercises'],
    ),
    filteredExercises() {
      const regExp = new RegExp(this.searchFilter, 'i');

      return this.getExercises.filter((exercise) => {
        return regExp.test(exercise.title);
      });
    },
  },
  components: {
    AdminPanelExerciseForm,
  },
};
</script>

<style scoped>
.exercise-row__image {
  width: 150px;
  height: 150px;
}

.mild-float-enter {
  transform: translateY(10px);
  opacity: 0;
}

.mild-float-enter-active {
  transition: all .3s ease;
}

.mild-float-move {
  transition: all .5s ease-out;
}
</style>
