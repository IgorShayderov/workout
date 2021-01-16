import TrainingProgramsBoard from '@js/components/TrainingProgramsBoard';
import TrainingProgramExercises from '@js/components/TrainingProgramExercises';
import UserProfile from '@js/components/UserProfile';
import TheCalendar from '@js/components/TheCalendar';
import CalendarDay from '@js/components/CalendarDay';
import AdminPanel from '@js/components/AdminPanel';
import AdminPanelExercises from '@js/components/AdminPanelExercises';
import E404 from '@js/components/E404';

export default [
  {
    path: '',
    component: TrainingProgramsBoard,
    name: 'root',
  },
  {
    path: '/training_programs/:trainingProgramId',
    component: TrainingProgramExercises,
    name: 'trainingProgramExercises',
    props: true,
  },
  {
    path: '/profile',
    component: UserProfile,
    name: 'profile',
  },
  {
    path: '/calendar',
    component: TheCalendar,
    name: 'calendar',
  },
  // TODO move this path to calendar's children
  {
    path: '/:year/:month/:day',
    component: CalendarDay,
    name: 'calendarDay',
    props: true,
  },
  {
    path: '/admin',
    component: AdminPanel,
    children: [
      {
        path: '',
        component: AdminPanelExercises,
        name: 'adminPanelExercises',
      },
    ],
  },
  {
    path: '*',
    component: E404,
  },
];
