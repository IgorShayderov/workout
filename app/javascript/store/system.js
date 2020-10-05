export default {
  namespaced: true,
  state: 
  {
    userInfo: gon.user,
    rootPath: gon.root,
    showWrapper: false,
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
    }
  },
  mutations: {
    SHOW_WRAPPER(state) {
      state.showWrapper = true;
    },
    HIDE_WRAPPER(state) {
      state.showWrapper = false;
    },
  },
  actions: {
    showWrapper({ commit }) {
      commit('SHOW_WRAPPER');
    },
    hideWrapper({ commit }) {
      commit('HIDE_WRAPPER');
    },
  }
};
