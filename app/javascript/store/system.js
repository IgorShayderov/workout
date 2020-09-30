export default {
  namespaced: true,
  state: 
  {
    userInfo: gon.user,
    rootPath: gon.root,
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getRootPath(state) {
      return state.rootPath;
    }
  },
  mutations: {
  },
  actions: {
  }
};
