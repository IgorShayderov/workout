import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Root from '../app';
import ExercisesAddition from '../components/ExercisesAddition';
import UserProfile from '../components/UserProfile';

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '',
      component: Root,
      name: 'root',
    },
    {
      path: '/:trainingProgramIndex/exercises',
      component: ExercisesAddition,
      name: 'exercisesAddition',
      props: true,
    },
    {
      path: '/profile',
      component: UserProfile,
      name: 'profile',
    },
  ]
});
