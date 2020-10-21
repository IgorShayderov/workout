import actions from './training_programs_actions';

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
    trainingPlans: {},
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
    getTrainingPlansByDate: (state) => (year, month, day) => {
      const trainingPlans = state.trainingPlans[year]
        && state.trainingPlans[year][month]
        && state.trainingPlans[year][month][day]

      return Array.isArray(trainingPlans)
              ? trainingPlans
              : [];
    },
  },
  mutations: {
    SAVE_TRAINING_PROGRAM(state, trainingProgram) {
      state.trainingPrograms.push(trainingProgram);
    },
    SAVE_AVAILABLE_EXERCISES(state, exercises) {
      state.availableExercises = exercises;
    },
    SAVE_TRAINING_PROGRAM_EXERCISES(state, { exercises, trainingProgram }) {
      trainingProgram.exercises = [...trainingProgram.exercises, ...exercises];
    },
    SAVE_COMMENTS(state, { comments, trainingProgram }) {
      trainingProgram.comments = [...trainingProgram.comments, ...comments];
    },
    SAVE_TRAINING_PLAN(state, { trainingPlan, year, month, day }) {
      if (!state.trainingPlans[year]) {
        state.trainingPlans[year] = {};
      }

      if (!state.trainingPlans[year][month]) {
        state.trainingPlans[year][month] = {};
      }

      if (!state.trainingPlans[year][month][day]) {
        state.trainingPlans[year][month][day] = [];
      }

      state.trainingPlans[year][month][day].push(trainingPlan);
    },
  },
  actions,
};

