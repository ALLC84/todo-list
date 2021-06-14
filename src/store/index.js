import Vue from "vue";
import Vuex from "vuex";
import todo from "./modules/todo";
import { fetchFromObject } from "@/utils/helpers/object";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    title: "Lista de tareas"
  },

  getters: {
    state: (state) => (field) => fetchFromObject(state, field)
  },

  modules: {
    todo
  }
});
