import Root from '@js/components/TrainingProgramsBoard';
import TrainingProgramExercises from '@js/components/TrainingProgramExercises';
import UserProfile from '@js/components/UserProfile';
import TheCalendar from '@js/components/TheCalendar';
import CalendarDay from '@js/components/CalendarDay';
import E404 from '@js/components/E404';

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
  {
    path: '/calendar',
    component: TheCalendar,
    name: 'calendar',
  },
  {
    path: '/:year/:month/:day/calendar_day',
    component: CalendarDay,
    name: 'calendarDay',
    props: true,
  },
  {
    path: '*',
    component: E404,
  },
];
