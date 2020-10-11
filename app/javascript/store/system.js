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
    }
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
    }
  }
};