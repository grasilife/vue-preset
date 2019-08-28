import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import login from "./modules/login";
export default new Vuex.Store({
  strict: true,
  modules: {
    login: login
  }
});
