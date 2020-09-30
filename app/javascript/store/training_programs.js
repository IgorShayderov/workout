export default {
  namespaced: true,
  state: 
  {
    training_programs: gon.training_programs,
  },
  getters: {
    getTrainingPrograms(state) {
      return state.training_programs;
    }
  },
  mutations: {
    ADD_TRAINING_PROGRAM(state, trainingProgram) {
      state.training_programs.push(trainingProgram);
    }
  },
  actions:
  {
    addTrainingProgram({commit}, trainingProgram) {
      commit('ADD_TRAINING_PROGRAM', trainingProgram);
    }
  }
};

