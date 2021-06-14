import {
  TODO_SET_SHOW_MODAL,
  TODO_SET_NEW,
  TODO_SET_PROPERTY,
  TODO_LIST_SET_PROPERTY,
  TODO_TASK_TO_EDIT,
  TODO_DELETE_TASK,
  TODOS_GET_AND_LOAD_TO_STORAGE,
  TODO_DELETE_ALL,
  TODOS_SORT_LIST
} from "../../actions/todos";
import {
  lsSetTodo,
  lsSetTodos,
  lsEditTaskInTodos,
  lsRemoveTaskInTodos,
  lsRemoveAllTodos
} from "@/utils/helpers/storage";

export default {
  [TODO_SET_SHOW_MODAL]: ({ commit }, value) => {
    commit(TODO_SET_SHOW_MODAL, value);
  },

  [TODOS_GET_AND_LOAD_TO_STORAGE]: ({ commit }, todos) => {
    commit(TODOS_GET_AND_LOAD_TO_STORAGE, todos);
  },

  [TODO_SET_NEW]: ({ commit }, todo) => {
    lsSetTodo(todo);
    commit(TODO_SET_NEW, todo);
  },

  [TODO_SET_PROPERTY]: ({ commit }, { field, value }) => {
    commit(TODO_SET_PROPERTY, { field, value });
  },

  [TODO_LIST_SET_PROPERTY]: ({ commit }, { title, field, value }) => {
    lsEditTaskInTodos(title, field, value);
    commit(TODO_LIST_SET_PROPERTY, { title, field, value });
  },

  [TODO_TASK_TO_EDIT]: ({ commit }, task) => {
    commit(TODO_TASK_TO_EDIT, task);
  },

  [TODO_DELETE_TASK]: ({ commit }, task) => {
    lsRemoveTaskInTodos(task);
    commit(TODO_DELETE_TASK, task);
  },

  [TODO_DELETE_ALL]: ({ commit }) => {
    lsRemoveAllTodos();
    commit(TODO_DELETE_ALL);
  },

  [TODOS_SORT_LIST]: ({ commit }, todos) => {
    lsSetTodos(todos);
    commit(TODOS_SORT_LIST, todos);
  }
};
