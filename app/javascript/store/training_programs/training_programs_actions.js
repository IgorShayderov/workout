import axios from 'axios';

export default {
  createAndSaveTrainingProgram({ commit, rootGetters }, trainingProgramData) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/training_programs',
        baseURL: rootGetters['system/getRootPath'],
        data: trainingProgramData,
        headers: rootGetters['system/getHeadersJSON'],
      })
          .then((response) => {
            const { data } = response;

            if (data.errors) {
              const { errors } = data;

              reject(errors);
            } else {
              data.exercises = [];
              data.comments = [];

              resolve();
              commit('SAVE_TRAINING_PROGRAM', data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    });
  },
  deleteExerciseFromProgram({ commit, getters, rootGetters }, { trainingProgramId, trainingProgramExerciseId }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `/training_programs/${trainingProgramId}/remove_exercise/${trainingProgramExerciseId}`,
        baseUrl: rootGetters['system/getRootPath'],
        headers: rootGetters['system/getHeadersJSON'],
      })
          .then((response) => {
            const { data } = response;

            if (data.errors) {
              const { errors } = data;

              reject(errors);
            } else {
              const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

              resolve();
              commit('DELETE_TRAINING_PROGRAM_EXERCISE', { trainingProgram, trainingProgramExerciseId });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    });
  },
  loadCalendarData({ rootGetters }) {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: '/calendar_rendering_data',
        baseUrl: rootGetters['system/getRootPath'],
      })
          .then((response) => {
            const { data } = response;

            resolve(data);
          })
          .catch((error) => {
            console.log(error);
          });
    });
  },
  loadTrainingPlans({ commit, rootGetters }, { year, month, day }) {
    axios({
      method: 'get',
      url: `/${year}/${month}/${day}/training_plans`,
      baseURL: rootGetters['system/getRootPath'],
    })
        .then((response) => {
          const { data } = response;

          if (data.length > 0) {
            data.forEach((trainingPlan) => {
              commit('SAVE_TRAINING_PLAN', trainingPlan);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
  },
  loadTrainingProgramComments({ commit, getters, rootGetters }, trainingProgramId) {
    const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

    axios({
      method: 'get',
      url: `/training_programs/${trainingProgramId}/comments`,
      baseUrl: rootGetters['system/getRootPath'],
    })
        .then((response) => {
          const { data } = response;

          commit('SAVE_COMMENTS', {
            comments: data,
            trainingProgram,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  },
  processTrainingProgramExercises({ dispatch, rootGetters }, { trainingProgramId, exercises }) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: `training_programs/${trainingProgramId}/add_exercises`,
        baseURL: rootGetters['system/getRootPath'],
        data: {
          exercises,
        },
        headers: rootGetters['system/getHeadersJSON'],
      })
          .then((response) => {
            const { data } = response;

            if (!data.errors) {
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
  saveComment({ commit, getters, rootGetters }, { comment, trainingProgramId }) {
    return new Promise((resolve) => {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

      axios({
        method: 'post',
        url: `/training_programs/${trainingProgramId}/comments`,
        baseURL: rootGetters['system/getRootPath'],
        data: {
          comment,
        },
        headers: rootGetters['system/getHeadersJSON'],
      })
          .then((response) => {
            const { data } = response;

            resolve(data);

            if (!data.errors) {
              commit('SAVE_COMMENTS', {
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
  saveTrainingProgramExercises({ commit, getters }, { trainingProgramId, exercises }) {
    const trainingProgram = getters.getTrainingProgramById(trainingProgramId);

    commit('SAVE_TRAINING_PROGRAM_EXERCISES', {
      exercises,
      trainingProgram,
    });
  },
  saveTrainingPlan({ commit, rootGetters }, {
    trainingPlanData,
    trainingProgramId,
  }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/training_programs/${trainingProgramId}/training_plans`,
        baseURL: rootGetters['system/getRootPath'],
        data: trainingPlanData,
        headers: rootGetters['system/getHeadersJSON'],
      })
          .then((response) => {
            const { data } = response;

            if (data.errors) {
              const { errors } = data;

              reject(errors);
            } else {
              resolve(data);
              commit('SAVE_TRAINING_PLAN', data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    });
  },
};
