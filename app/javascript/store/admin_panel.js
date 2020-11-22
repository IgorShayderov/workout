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
