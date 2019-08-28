const state = {
  useName: "sam"
};
const mutations = {
  change_name(state, payload) {
    state.useName = payload;
  }
};
const actions = {
  changeName({ commit, rootState }, payload) {
    if (rootState.job == "web") {
      commit("change_name", payload);
    }
  }
};
const getters = {
  localJobTitle(state, getters, rootState, rootGetters) {
    return rootGetters.jobTitle + " aka " + rootState.job;
  }
};
// namespaced 属性，限定命名空间
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
