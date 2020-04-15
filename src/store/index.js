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
  },
  mutations: {
    setRole(state, admin) {
      Vue.set(state, 'role', admin);
    },
    setObjectId(state, id) {
      Vue.set(state, 'objectId', id);
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
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
