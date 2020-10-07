import axios from 'axios';

const trainingPrograms = gon.training_programs
  ? gon.training_programs.map((trainingProgram) => {
    // defining property in advance to use vue reactivity
    Object.defineProperty(trainingProgram, 'exercises', {
      configurable: true,
      enumerable: true,
      value: [],
      writable: true,
    });

    return trainingProgram;
  })
  : [];

export default {
  namespaced: true,
  state: 
  {
    available_exercises: [],
    training_programs: trainingPrograms,
  },
  getters: {
    getAvailableExercises(state) {
      return state.available_exercises;
    },
    getTrainingPrograms(state) {
      return state.training_programs;
    },
    getTrainingProgramById: (state) => (trainingProgramId) => {
      return state.training_programs.find((program) => program.id.toString() === trainingProgramId.toString());
    },
    getAvailableExerciseById: (state) => (exerciseId) => {
      return state.available_exercises.find((exercise) => exercise.id === exerciseId);
    },
  },
  mutations: {
    SAVE_TRAINING_PROGRAM(state, trainingProgram) {
      state.training_programs.push(trainingProgram);
    },
    ADD_AVAILABLE_EXERCISES(state, exercises) {
      state.available_exercises = exercises;
    },
    ADD_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = [...trainingProgram.exercises, ...exercises];
    },
    CREATE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = exercises;
    },
  },
  actions:
  {
    saveTrainingProgram({ commit }, trainingProgram) {
      commit('SAVE_TRAINING_PROGRAM', trainingProgram);
    },
    processTrainingProgramExercises({ dispatch }, { trainingProgramId, exercises, token }) {
      return new Promise((resolve) => {
        axios({
          method: 'post',
          url: `/exercises/${trainingProgramId}/save_exercises`,
          data: {
            exercises,
          },
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token,
            'Accept': 'application/json',
          }
        })
        .then((response) => {
          const { data } = response;

          console.log(data);

          resolve();
          dispatch('saveTrainingProgramExercises', {
            trainingProgramId,
            exercises: data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      });
    },
    saveTrainingProgramExercises({ commit, getters }, { trainingProgramId, exercises }) {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

      if (trainingProgram.hasOwnProperty('exercises')) {
        commit('ADD_TRAINING_PROGRAM_EXERCISES', {
          exercises,
          trainingProgram,
        });
      } else {
        commit('CREATE_TRAINING_PROGRAM_EXERCISES', {
          exercises,
          trainingProgram,
        });
      }
    },
    addAvailableExercises({ commit }, trainingProgramId) {
      axios.get(`exercises/${trainingProgramId}/available_exercises`)
      .then((response) => {
        const { data } = response;

        commit('ADD_AVAILABLE_EXERCISES', data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    loadTrainingProgramExercises({ dispatch }, trainingProgramId) {
      axios.get(`exercises/${trainingProgramId}/training_program_exercises`)
      .then((response) => {
        const { data } = response;

        dispatch('saveTrainingProgramExercises', {
          trainingProgramId,
          exercises: data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
};

