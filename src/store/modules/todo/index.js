import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = {
  todos: [],
  taskToEdit: {},
  modal: false
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
