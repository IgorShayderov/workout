import axios from 'axios';

const trainingPrograms = gon.training_programs
  ? gon.training_programs.map((trainingProgram) => {
    // defining properties in advance to use vue reactivity
    trainingProgram.exercises = [];
    trainingProgram.comments = [];
    trainingProgram.trainingPlans = [];

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
    },
    ADD_TRAINING_PLANS(state, { trainingPlans, trainingProgram }) {
      trainingProgram.trainingPlans = [...trainingProgram.trainingPlans, ...trainingPlans];
    },
  },
  actions:
  {
    loadTrainingProgramComments({ commit, getters, rootGetters }, trainingProgramId) {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);
      
      axios({
        method: 'get',
        url: `/training_programs/${trainingProgramId}/comments`,
        baseUrl: rootGetters['system/getRootPath'],
      })
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
          url: `training_programs/${trainingProgramId}/save_exercises `,
          baseURL: rootGetters['system/getRootPath'],
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
    addAvailableExercises({ commit, rootGetters }, trainingProgramId) {
      axios({
        method: 'get',
        url: `training_programs/${trainingProgramId}/available_exercises`,
        baseURL: rootGetters['system/getRootPath'],
      })
      .then((response) => {
        const { data } = response;

        commit('ADD_availableExercises', data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    loadTrainingProgramExercises({ dispatch, rootGetters }, trainingProgramId) {
      axios({
        method: 'get',
        url: `training_programs/${trainingProgramId}/training_program_exercises`,
        baseURL: rootGetters['system/getRootPath'],
      })
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
    processTrainingProgram({ dispatch, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/training_programs',
          baseURL: rootGetters['system/getRootPath'],
          data,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': rootGetters['system/getToken'],
            'Accept': 'application/json',
          }
        })
        .then((response) => {
          const { data } = response;

          if (data.errors) {
            const { errors } = data;

            reject(errors);
          } else {
            resolve();
            dispatch('saveTrainingProgram', data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      });
    },
    saveComment({ commit, getters, rootGetters }, { comment, trainingProgramId }) {
      return new Promise((resolve) => {
        const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

        axios({
          method: 'post',
          url: `training_programs/${trainingProgramId}/comments`,
          baseURL: rootGetters['system/getRootPath'],
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
  
          resolve(data);

          if (!data.hasOwnProperty('errors')) {
            commit('ADD_COMMENTS', {
              comments: [ data ],
              trainingProgram,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      });
    },
    loadTrainingPlans({ commit, getters }, trainingProgramId) {
      axios({
        method: 'get',
        url: `training_programs/${trainingProgramId}/training_plans`,
        baseURL: rootGetters['system/getRootPath'],
      })
      .then((response) => {
        const trainingProgram = getters.getTrainingProgramById(trainingProgramId);
        const { data } = response;

        commit('ADD_TRAINING_PLANS', {
          trainingPlans: data,
          trainingProgram,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};

