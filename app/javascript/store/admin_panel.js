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
  },
  mutations: {
    SAVE_EXERCISES(state, exercises) {
      state.exercises = [ ...state.exercises, ...exercises ];
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
          headers: rootGetters['system/getPostHeaders'],
        })
            .then((response) => {
              const { data } = response;

              if (data.errors) {
                const { errors } = data;

                reject(errors);
              } else {
                resolve();
                commit('SAVE_EXERCISES', [ data ]);
              }
            })
            .catch((error) => {
              console.log(error);
            });
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
            console.log(error);
          });
    },
  },
};
