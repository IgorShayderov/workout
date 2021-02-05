// for jest units-tests
const gon = window.gon || {};

import actions from './training_programs/training_programs_actions';

const trainingPrograms = gon.training_programs || [];

export default {
  namespaced: true,
  state:
  {
    trainingPlans: [],
    trainingPrograms,
  },
  getters: {
    getTrainingPrograms(state) {
      return state.trainingPrograms;
    },
    getCommentsByTrainingProgramId: (state, getters) => (trainingProgramId) => {
      const trainingProgram = getters.getTrainingProgramById(trainingProgramId);
      let comments = [];

      if (typeof trainingProgram !== 'undefined') {
        comments = trainingProgram.comments;
      }

      return comments;
    },
    getTrainingProgramById: (state) => (trainingProgramId) => {
      return state.trainingPrograms.find((program) => program.id.toString() === trainingProgramId.toString());
    },
    getTrainingPlansByDate: (state) => (year, month, day) => {
      if (state.trainingPlans.length > 0) {
        const minDate = new Date(year, month - 1, day);
        const maxDate = new Date(year, month - 1, day, 23, 59);

        return state.trainingPlans.filter((plan) => {
          return new Date(plan.start_time) > minDate && new Date(plan.end_time) < maxDate;
        });
      }

      return [];
    },
  },
  mutations: {
    DELETE_TRAINING_PROGRAM_EXERCISE(state, { trainingProgram, trainingProgramExerciseId }) {
      trainingProgram.exercises = trainingProgram
          .exercises
          .filter((exercise) => exercise.training_program_exercise_id != trainingProgramExerciseId);
    },
    SAVE_TRAINING_PROGRAM(state, trainingProgram) {
      state.trainingPrograms.push(trainingProgram);
    },
    SAVE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = [...trainingProgram.exercises, ...exercises];
    },
    SAVE_COMMENTS(state, { comments, trainingProgram }) {
      trainingProgram.comments = [...trainingProgram.comments, ...comments];
    },
    SAVE_TRAINING_PLAN(state, trainingPlan) {
      state.trainingPlans.push(trainingPlan);
    },
  },
  actions,
};

