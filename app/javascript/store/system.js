// for jest unit-tests
const gon = window.gon || {};

import axios from 'axios';

export default {
  namespaced: true,
  state:
  {
    userInfo: gon.user,
    rootPath: gon.root,
    showWrapper: false,
    token: '',
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getRootPath(state) {
      return state.rootPath;
    },
    getWrapperStatus(state) {
      return state.showWrapper;
    },
    getToken(state) {
      return state.token;
    },
    getPostHeaders(state, getters) {
      return {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getters.getToken,
        'Accept': 'application/json',
      };
    },
  },
  mutations: {
    SHOW_WRAPPER(state) {
      state.showWrapper = true;
    },
    HIDE_WRAPPER(state) {
      state.showWrapper = false;
    },
    SAVE_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    showWrapper({ commit }) {
      commit('SHOW_WRAPPER');
    },
    hideWrapper({ commit }) {
      commit('HIDE_WRAPPER');
    },
    saveToken({ commit }, token) {
      commit('SAVE_TOKEN', token);
    },
    isUserAdmin({ getters }) {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          url: 'is_admin',
          baseURL: getters.getRootPath,
        })
            .then((response) => {
              const { data } = response;

              resolve(data);
            })
            .catch((error) => {
              console.log(error);
            });
      });
    },
  },
};
