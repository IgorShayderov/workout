import Root from '../components/TrainingProgramsBoard';
import TrainingProgramExercises from '../components/TrainingProgramExercises';
import UserProfile from '../components/UserProfile';

export default [
  {
    path: '',
    component: Root,
    name: 'root',
  },
  {
    path: '/:trainingProgramId/exercises',
    component: TrainingProgramExercises,
    name: 'trainingProgramExercises',
    props: true,
  },
  {
    path: '/profile',
    component: UserProfile,
    name: 'profile',
  },
];
