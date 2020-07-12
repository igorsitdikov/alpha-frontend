import Vue from 'vue';

const data = {
  dialogProjectOpen: false,
  dialogObjectOpen: false,
};

const getters = {
  dialogObjectOpen: (state) => state.dialogObjectOpen,
  dialogProjectOpen: (state) => state.dialogProjectOpen,
};

const mutations = {
  setDialogProject(state, open) {
    Vue.set(state, 'dialogProjectOpen', open);
  },
  toggleProjectDialog(state) {
    state.dialogProjectOpen = !state.dialogProjectOpen;
  },
  setDialogObject(state, open) {
    Vue.set(state, 'dialogObjectOpen', open);
  },
  toggleObjectDialog(state) {
    state.dialogObjectOpen = !state.dialogObjectOpen;
  },
};

const actions = {
  toggleProjectDialog({ commit }) {
    commit('toggleProjectDialog');
  },
  toggleObjectDialog({ commit }) {
    commit('toggleObjectDialog');
  },
};

export default {
  state: data,
  getters,
  mutations,
  actions,
};
