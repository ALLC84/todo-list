<template>
  <div class="custom__modal modal-dialog">
    <div class="custom__modal-content modal-content">
      <div class="modal-body">
        <todo-new-task
          type="edit"
          :taskToEdit="taskToEdit"
          @edit-task="editTask"
        />
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoNewTask from "./InputNewTask";
import {
  TODO_LIST_SET_PROPERTY,
  TODO_SET_SHOW_MODAL,
} from "@/store/actions/todos";
export default {
  name: "Modal",

  components: {
    TodoNewTask,
  },

  computed: {
    taskToEdit() {
      return this.$store.getters["todo/state"]("taskToEdit");
    },
  },

  methods: {
    editTask({ title, priority }) {
      this.$store.dispatch(`todo/${TODO_LIST_SET_PROPERTY}`, {
        title: this.taskToEdit.title,
        field: "title",
        value: title,
      });
      this.$store.dispatch(`todo/${TODO_LIST_SET_PROPERTY}`, {
        title: this.taskToEdit.title,
        field: "priority",
        value: priority,
      });
      this.closeModal();
    },

    closeModal() {
      this.$store.dispatch(`todo/${TODO_SET_SHOW_MODAL}`, false);
    },
  },
};
</script>

<style scoped>
.custom__modal {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 11;
  max-width: 100%;
}
.custom__modal-content {
  background-color: rgb(218, 231, 240);
}

@media (min-width: 575px) {
  .custom__modal {
    left: 10%;
    right: 10%;
    min-width: 80%;
  }
}
</style>