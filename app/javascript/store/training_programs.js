import axios from 'axios';

export default {
  namespaced: true,
  state: 
  {
    available_exercises: [],
    training_programs: gon.training_programs,
  },
  getters: {
    getAvailableExercises(state) {
      return state.available_exercises;
    },
    getTrainingPrograms(state) {
      return state.training_programs;
    },
    getTrainingProgramById(state, id) {
      return state.training_programs.find((program) => program.id === id);
    },
  },
  mutations: {
    ADD_TRAINING_PROGRAM(state, trainingProgram) {
      state.training_programs.push(trainingProgram);
    },
    ADD_AVAILABLE_EXERCISES(state, exercises) {
      state.available_exercises = exercises;
    },
  },
  actions:
  {
    addTrainingProgram({ commit }, trainingProgram) {
      commit('ADD_TRAINING_PROGRAM', trainingProgram);
    },
    addAvailableExercises({ commit }, trainingProgramId) {
      axios.get(`api/v1/${trainingProgramId}/available_exercises`)
      .then((response) => {
        const { data } = response;

        commit('ADD_AVAILABLE_EXERCISES', data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  }
};

