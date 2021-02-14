import axios from 'axios';

export default {
  namespaced: true,
  state: {
    exercises: [],
  },
  getters: {
    getExercises: (state) => {
      return state.exercises;
    },
    getExerciseById: (state) => {
      return (exerciseId) => state.exercises.find((exercise) => exercise.id === exerciseId);
    },
  },
  mutations: {
    DELETE_EXERCISE(state, id) {
      const indexOfExercise = state.exercises.findIndex((exercise) => exercise.id === id);

      if (indexOfExercise !== -1) {
        state.exercises.splice(indexOfExercise, 1);
      }
    },
    UPDATE_EXERCISE(state, { updatedExercise, id }) {
      const indexOfExercise = state.exercises.findIndex((exercise) => exercise.id === id);

      if (indexOfExercise !== -1) {
        state.exercises.splice(indexOfExercise, 1, updatedExercise);
      }
    },
    SAVE_EXERCISES(state, exercises) {
      state.exercises = [...state.exercises, ...exercises];
    },
  },
  actions: {
    createAndSaveExercise({ commit, rootGetters }, exerciseData) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/exercises',
          baseUrl: rootGetters['system/getRootPath'],
          data: exerciseData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRF-Token': rootGetters['system/getToken'],
            'Accept': 'application/json',
          },
        })
            .then((response) => {
              const { data } = response;

              if (data.errors) {
                const { errors } = data;

                reject(errors);
              } else {
                resolve();
                commit('SAVE_EXERCISES', [data]);
              }
            })
            .catch((error) => {
              console.error(error);
            });
      });
    },
    processExerciseDeletion({ commit, rootGetters }, id) {
      axios({
        method: 'delete',
        url: `/exercises/${id}`,
        baseUrl: rootGetters['system/getRootPath'],
        headers: rootGetters['system/getHeadersJSON'],
      })
          .then((response) => {
            const { data } = response;

            commit('DELETE_EXERCISE', data.id);
          })
          .catch((error) => {
            console.error(error);
          });
    },
    loadExercises({ commit, rootGetters }) {
      axios({
        method: 'get',
        url: '/exercises',
        baseUrl: rootGetters['system/getRootPath'],
      })
          .then((response) => {
            const { data } = response;

            commit('SAVE_EXERCISES', data);
          })
          .catch((error) => {
            console.error(error);
          });
    },
    updateAndSaveExercise({ commit, rootGetters }, { exerciseParams, id }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `/exercises/${id}`,
          baseUrl: rootGetters['system/getRootPath'],
          data: exerciseParams,
          headers: rootGetters['system/getHeadersJSON'],
        })
            .then((response) => {
              const { data } = response;

              if (data.errors) {
                const { errors } = data;

                reject(errors);
              } else {
                resolve();
                commit('UPDATE_EXERCISE', { updatedExercise: data, id });
              }
            })
            .catch((error) => {
              console.error(error);
            });
      });
    },
    processAttachedImageDeletion({ rootGetters }, attachmentId) {
      return new Promise((resolve) => {
        axios({
          method: 'delete',
          url: `/attachments/${attachmentId}`,
          baseUrl: rootGetters['system/getRootPath'],
          headers: rootGetters['system/getHeadersJSON'],
        })
            .then((response) => {
              const { data } = response;
            })
            .catch((error) => {
              console.error(error);
            });
      });
    },
  },
};
