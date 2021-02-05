import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm';
import App from '../app.vue';
import Vuex from 'vuex';
import routes from '@js/routes/routes';
import trainingPrograms from '@js/store/training_programs';
import system from '@js/store/system';
import adminPanel from '@js/store/admin_panel';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(TurbolinksAdapter);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    trainingPrograms,
    system,
    adminPanel,
  },
});

const router = new VueRouter({
  mode: 'history',
  routes,
});

document.addEventListener('turbolinks:load', () => {
  const vueHookElem = document.querySelector('#hello');

  if (vueHookElem) {
    new Vue({
      el: '#hello',
      store,
      router,
      render: (h) => h(App, {}),
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection!');
  console.info(event.promise);
  console.error(event.reason);
});
