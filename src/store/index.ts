import Vue from "vue";
import Vuex from "vuex";
import State from "./State";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store<State>({
    state: new State(),
    mutations,
    actions: {},
    getters
});
