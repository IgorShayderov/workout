import axios from 'axios';

export default {
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
    })
  },
  saveTrainingProgram({ commit }, trainingProgram) {
    commit('SAVE_TRAINING_PROGRAM', trainingProgram);
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
        headers: rootGetters['system/getPostHeaders'],
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

    commit('SAVE_TRAINING_PROGRAM_EXERCISES', {
      exercises,
      trainingProgram,
    });
  },
  addAvailableExercises({ commit, rootGetters }, trainingProgramId) {
    axios({
      method: 'get',
      url: `training_programs/${trainingProgramId}/exercises/available`,
      baseURL: rootGetters['system/getRootPath'],
    })
    .then((response) => {
      const { data } = response;

      commit('SAVE_AVAILABLE_EXERCISES', data);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  loadTrainingProgramExercises({ dispatch, rootGetters }, trainingProgramId) {
    axios({
      method: 'get',
      url: `training_programs/${trainingProgramId}/exercises`,
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
  processTrainingProgram({ dispatch, rootGetters }, trainingProgramData) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/training_programs',
        baseURL: rootGetters['system/getRootPath'],
        data: trainingProgramData,
        headers: rootGetters['system/getPostHeaders'],
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
        headers: rootGetters['system/getPostHeaders'],
      })
      .then((response) => {
        const { data } = response;

        resolve(data);

        if (!data.hasOwnProperty('errors')) {
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
  loadTrainingPlans({ commit, rootGetters }, { year, month, day }) {
    axios({
      method: 'get',
      url: `${year}/${month}/${day}/training_plans`,
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
  saveTrainingPlan({ commit, rootGetters }, {
    trainingPlanData,
    trainingProgramId,
    year,
    month,
    day ,
  }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/training_programs/${trainingProgramId}/training_plans`,
        baseURL: rootGetters['system/getRootPath'],
        data: trainingPlanData,
        headers: rootGetters['system/getPostHeaders'],
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
}
