import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm';
import App from '../app.vue';
import Vuex from 'vuex';
import routes from '../routes/routes';
import trainingPrograms from '../store/training_programs';
import system from '../store/system';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(TurbolinksAdapter);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    trainingPrograms,
    system,
  },
});

const router = new VueRouter({
  // mode: 'history',
  routes,
})

document.addEventListener('turbolinks:load', () => {
  const vueHookElem = document.querySelector('#hello');

  if (vueHookElem) {
    const app = new Vue({
      el: '#hello',
      store,
      router,
      render: h => h(App, {}),
    });
  }
});
