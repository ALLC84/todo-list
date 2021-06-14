// Privates local storage
const localStorageGetObject = (key) => JSON.parse(localStorage.getItem(key));
const localStorageSetItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const localStorageRemoveItem = (key) => localStorage.removeItem(key);

// Local Storage
export const lsGetTodos = () => localStorageGetObject("todos") || [];

export const lsSetTodos = (todos) => {
  lsRemoveAllTodos();
  localStorageSetItem("todos", todos);
};

export const lsSetTodo = (todo) => {
  const todos = lsGetTodos();
  todos.unshift(todo);
  localStorageSetItem("todos", todos);
};

export const lsEditTaskInTodos = (title, property, newValue) => {
  let storageTodos = lsGetTodos();
  lsRemoveAllTodos();
  storageTodos.forEach((task) => {
    if (task.title === title) {
      task[property] = newValue;
    }
  });
  localStorageSetItem("todos", storageTodos);
};

export const lsRemoveTaskInTodos = (task) => {
  let storageTodos = lsGetTodos();
  lsRemoveAllTodos();
  const filteredTodos = storageTodos.filter(
    (todo) => todo.title !== task.title
  );
  localStorageSetItem("todos", filteredTodos);
};

export const lsRemoveAllTodos = () => {
  localStorageRemoveItem("todos");
};
