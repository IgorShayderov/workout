import axios from 'axios';

const trainingPrograms = gon.training_programs
  ? gon.training_programs.map((trainingProgram) => {
    // defining properties in advance to use vue reactivity
    trainingProgram.exercises = [];
    trainingProgram.comments = [];

    return trainingProgram;
  })
  : [];

export default {
  namespaced: true,
  state: 
  {
    availableExercises: [],
    trainingPrograms,
  },
  getters: {
    getAvailableExercises(state) {
      return state.availableExercises;
    },
    getTrainingPrograms(state) {
      return state.trainingPrograms;
    },
    getCommentsByTrainingProgramId: (state, getters) => (trainingProgramId) => {
      return getters.getTrainingProgramById(trainingProgramId).comments;
    },
    getTrainingProgramById: (state) => (trainingProgramId) => {
      return state.trainingPrograms.find((program) => program.id.toString() === trainingProgramId.toString());
    },
    getAvailableExerciseById: (state) => (exerciseId) => {
      return state.availableExercises.find((exercise) => exercise.id === exerciseId);
    },
  },
  mutations: {
    SAVE_TRAINING_PROGRAM(state, trainingProgram) {
      state.trainingPrograms.push(trainingProgram);
    },
    ADD_availableExercises(state, exercises) {
      state.availableExercises = exercises;
    },
    ADD_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = [...trainingProgram.exercises, ...exercises];
    },
    ADD_COMMENTS(state, { comments, trainingProgram }) {
      trainingProgram.comments = [...trainingProgram.comments, ...comments];
    }
  },
  actions:
  {
    loadTrainingProgramComments({ commit, getters }, trainingProgramId) {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);
      
      axios.get(`/training_programs/${trainingProgramId}/comments`)
      .then((response) => {
        const { data } = response;

        commit('ADD_COMMENTS', {
          comments: data,
          trainingProgram,
        });
      })
      .catch((error) => {
        console.log(error);
      })
    },
    saveTrainingProgram({ commit }, trainingProgram) {
      commit('SAVE_TRAINING_PROGRAM', trainingProgram);
    },
    processTrainingProgramExercises({ dispatch, rootGetters }, { trainingProgramId, exercises }) {
      return new Promise((resolve) => {
        axios({
          method: 'post',
          url: `/exercises/${trainingProgramId}/save_exercises`,
          data: {
            exercises,
          },
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': rootGetters['system/getToken'],
            'Accept': 'application/json',
          }
        })
        .then((response) => {
          const { data } = response;

          if (!data.hasOwnProperty('errors')) {
            dispatch('saveTrainingProgramExercises', {
              trainingProgramId,
              exercises: data,
            });
          }

          resolve(data);
        })
        .catch((error) => {
          console.log(error);
        });
      });
    },
    saveTrainingProgramExercises({ commit, getters }, { trainingProgramId, exercises }) {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

      commit('ADD_TRAINING_PROGRAM_EXERCISES', {
        exercises,
        trainingProgram,
      });
    },
    addAvailableExercises({ commit }, trainingProgramId) {
      axios.get(`exercises/${trainingProgramId}/available_exercises`)
      .then((response) => {
        const { data } = response;

        commit('ADD_availableExercises', data);
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
    },
    saveComment({ commit, getters, rootGetters }, { comment, trainingProgramId }) {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

      axios({
        method: 'post',
        url: `/training_programs/${trainingProgramId}/comments`,
        data: {
          comment,
        },
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': rootGetters['system/getToken'],
          'Accept': 'application/json',
        }
      })
      .then((response) => {
        const { data } = response;

        console.log(data, 'data comment');

        commit('ADD_COMMENTS', {
          comments: [ data ],
          trainingProgram,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};

