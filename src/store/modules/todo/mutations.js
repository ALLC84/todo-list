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
import { setValueObjectByField } from "@/utils/helpers/object";

export default {
  [TODO_SET_SHOW_MODAL]: (state, value) => {
    state.modal = value;
  },

  [TODOS_GET_AND_LOAD_TO_STORAGE]: (state, inialTodos) => {
    state.todos = inialTodos;
  },

  [TODO_SET_NEW]: (state, todo) => {
    state.todos.unshift(todo);
  },

  [TODO_SET_PROPERTY]: (state, { field, value }) => {
    setValueObjectByField(state, field, value);
  },

  [TODO_LIST_SET_PROPERTY]: (state, { title, field, value }) => {
    state.todos.map((todo) =>
      todo.title === title ? (todo[field] = value) : null
    );
  },

  [TODO_TASK_TO_EDIT]: (state, task) => {
    state.taskToEdit = task;
  },

  [TODO_DELETE_TASK]: (state, { title }) => {
    state.todos = state.todos.filter((todo) => todo.title !== title);
  },

  [TODO_DELETE_ALL]: (state) => {
    state.todos = [];
  },

  [TODOS_SORT_LIST]: (state, todos) => {
    state.todos = todos;
  }
};
