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
    getTrainingProgramById: (state) => (trainingProgramId) => {
      return state.training_programs.find((program) => program.id === trainingProgramId);
    },
    getAvailableExerciseById: (state) => (exerciseId) => {
      return state.available_exercises.find((exercise) => exercise.id === exerciseId);
    },
  },
  mutations: {
    ADD_TRAINING_PROGRAM(state, trainingProgram) {
      state.training_programs.push(trainingProgram);
    },
    ADD_AVAILABLE_EXERCISES(state, exercises) {
      state.available_exercises = exercises;
    },
    ADD_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = [...trainingProgram.exercises, ...exercises];
    },
    CREATE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = [...exercises];
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
    loadTrainingProgramExercises({ commit, getters }, trainingProgramId) {
      return new Promise((resolve) => {
        axios.get(`api/v1/${trainingProgramId}/training_program_exercises`)
        .then((response) => {
          const { data } = response;
          const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

          if (trainingProgram.exercises) {
            commit('ADD_TRAINING_PROGRAM_EXERCISES', {
              exercises: data,
              trainingProgram,
            });
          } else {
            commit('CREATE_TRAINING_PROGRAM_EXERCISES', {
              exercises: data,
              trainingProgram,
            });
          }

          resolve(data);
        })
        .catch((error) => {
          console.log(error);
        })
      });
    }
  }
};

