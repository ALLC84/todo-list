<template>
  <div>
    <!-- NINPUT NEW TASK -->
    <input-new-task @create-new-task="newTask" />

    <!-- FILTER  BY STATUS AND PRIORITY-->
    <radiobutton-filters
      @change-priority-filter="setProperty"
      @change-status-filter="setStatus"
    />

    <!-- TASKS LIST -->
    <draggable v-model="filteredTodos" v-if="filteredTodos.length">
      <div
        class="list-group-item | d-flex justify-content-between align-items-center"
        v-for="(task, index) in filteredTodos"
        :key="`${task.title}-${index}`"
      >
        <div
          class="input-group | border-start rounded-start border-2"
          :class="classObject[task.priority]"
        >
          <div class="input-group-text">
            <input
              :id="`checkbox-${index}`"
              :name="task.title"
              class="form-check-input | mt-0"
              type="checkbox"
              :checked="task.done"
              aria-label="Checkbox for following text input"
              @click="updateStatus(task.title, task.done)"
            />
          </div>
          <input
            :id="`input-${index}`"
            type="text"
            class="form-control | fs-5 fw-bolder"
            aria-label="Text input with checkbox"
            :value="task.title"
            disabled
          />
        </div>
        <div class="d-flex align-items-center">
          <button
            type="button"
            class="btn btn-warning | ms-2"
            @click="editTask(task)"
          >
            <span class="bi bi-pencil"></span>
          </button>
          <button
            type="button"
            class="btn btn-danger | ms-2"
            @click="deleteTask(task)"
          >
            <span class="bi bi-trash"></span>
          </button>
        </div>
      </div>
    </draggable>
    <h3 v-else>No hay tareas para mostrar...</h3>
  </div>
</template>

<script>
import InputNewTask from "./InputNewTask";
import RadiobuttonFilters from "./RadiobuttonFilters";
import draggable from "vuedraggable";
import swal from "sweetalert";
import { CLASS_PRIORITY_TASK } from "@/store/enums";
import {
  TODOS_SORT_LIST,
  TODO_SET_NEW,
  TODO_LIST_SET_PROPERTY,
  TODO_TASK_TO_EDIT,
  TODO_DELETE_TASK,
  TODO_SET_SHOW_MODAL,
} from "@/store/actions/todos";

export default {
  name: "TodoList",

  components: {
    InputNewTask,
    RadiobuttonFilters,
    draggable,
  },

  data() {
    return {
      status: false,
      priority: 0,
      classObject: CLASS_PRIORITY_TASK,
    };
  },

  computed: {
    todos() {
      return this.$store.getters["todo/state"]("todos");
    },

    filteredTodos: {
      get() {
        return this.filterByPriorirty(
          this.filterByStatus(this.todos, this.status),
          this.priority
        );
      },
      set(value) {
        this.$store.dispatch(`todo/${TODOS_SORT_LIST}`, value);
      },
    },

    showModal() {
      return this.$store.getters["todo/state"]("modal");
    },
  },

  methods: {
    // CRUD
    newTask(task) {
      this.$store.dispatch(`todo/${TODO_SET_NEW}`, task);
    },

    editTask(task) {
      this.$store.dispatch(`todo/${TODO_SET_SHOW_MODAL}`, !this.showModal);
      this.$store.dispatch(`todo/${TODO_TASK_TO_EDIT}`, task);
    },

    deleteTask(task) {
      swal({
        title: "Estas seguro ?",
        text: "Se eliminará esta tarea para siempre!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch(`todo/${TODO_DELETE_TASK}`, task);
          swal("Tarea eliminada!", {
            icon: "success",
          });
        } else {
          swal("Nada ha pasado, tu tareas sigue tal cual!");
        }
      });
    },

    // EDIT PROPERTY
    updateStatus(title, done) {
      this.$store.dispatch(`todo/${TODO_LIST_SET_PROPERTY}`, {
        title,
        field: "done",
        value: !done,
      });
    },

    setStatus(value) {
      this.status = value;
    },

    setProperty(value) {
      this.priority = value;
    },

    // FILTERED
    filterByStatus(todos, status) {
      if (status !== null) {
        todos = todos.filter((todo) => todo.done === status);
      }
      return todos;
    },

    filterByPriorirty(todos, priority) {
      if (priority !== 0 && todos.length) {
        todos = todos.filter((todo) => todo.priority === priority);
      }
      return todos;
    },
  },
};
</script>

