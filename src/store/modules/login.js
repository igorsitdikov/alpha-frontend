import Vue from 'vue';
import router from '../../router';

const data = {
  role: false,
  authorized: false,
  objectId: '',
  userId: '',
  isProject: false,
};

const getters = {};

const mutations = {
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
};

const actions = {
  async logout({ commit }) {
    commit('logout');
    await router.push('login');
  },
};

export default {
  state: data,
  getters,
  mutations,
  actions,
};
