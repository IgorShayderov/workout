import Root from '../components/TrainingProgramsBoard';
import ExercisesAddition from '../components/ExercisesAddition';
import UserProfile from '../components/UserProfile';

export default [
  {
    path: '',
    component: Root,
    name: 'root',
  },
  {
    path: '/:trainingProgramId/exercises',
    component: ExercisesAddition,
    name: 'exercisesAddition',
    props: true,
  },
  {
    path: '/profile',
    component: UserProfile,
    name: 'profile',
  },
];
