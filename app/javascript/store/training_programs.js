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
    trainingPlans: [],
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
    SAVE_TRAINING_PLAN(state, trainingPlan) {
      state.trainingPlans.push(trainingPlan);
    },
  },
  actions,
};

