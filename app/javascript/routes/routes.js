import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Root from '../app';
import TrainingProgramCreateForm from '../components/TrainingProgramCreateForm';

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '',
      component: Root,
      name: 'root',
    },
    {
      path: '/create',
      component: TrainingProgramCreateForm,
      name: 'createForm',
    }
  ]
});
