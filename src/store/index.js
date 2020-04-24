import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './modules/login';
import view from './modules/view';
import dialog from './modules/dialog';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    view,
    dialog,
  },
  plugins: [createPersistedState()],
});
