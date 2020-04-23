import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: false,
    authorized: false,
    objectId: '',
    userId: '',
    isProject: false,
    projectSidebarOpen: false,
  },
  getters: {
    projectSidebarOpen: (state) => state.projectSidebarOpen,
  },
  mutations: {
    toggleProjectSidebar(state) {
      state.projectSidebarOpen = !state.projectSidebarOpen;
    },
    setRole(state, admin) {
      Vue.set(state, 'role', admin);
    },
    setIsProject(state, project) {
      Vue.set(state, 'isProject', project);
    },
    setObjectId(state, id) {
      Vue.set(state, 'objectId', id);
    },
    setUserId(state, id) {
      Vue.set(state, 'userId', id);
    },
    setAuthorized(state, authorized) {
      Vue.set(state, 'authorized', authorized);
    },
    logout(state) {
      Vue.set(state, 'role', false);
      Vue.set(state, 'authorized', false);
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      localStorage.removeItem('vuex');
    },
  },
  actions: {
    async logout({ commit }) {
      commit('logout');
      await router.push('login');
    },
    toggleProjectSidebar({ commit }) {
      commit('toggleProjectSidebar');
    },
    getProjectSidebarState({ state }) {
      return state.projectSidebarOpen;
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
