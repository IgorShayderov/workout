import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'
import Vuex from 'vuex';
import data from '../store/data';

Vue.use(TurbolinksAdapter);
Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    data,
  },
});

document.addEventListener('turbolinks:load', () => {
  const app = new Vue({
    el: '#hello',
    store,
    render: h => h(App, {
      props: {
        trainingPrograms: gon.training_programs,
      }
    })
  })
})
