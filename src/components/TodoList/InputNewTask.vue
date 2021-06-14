<template>
  <div class="input-group mb-4">
    <button
      type="button"
      class="btn btn-outline-secondary | fw-bolder | dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      :value="textSelected"
    >
      {{ textSelected }}
    </button>
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      v-model="value"
      v-on:keyup.enter="onKeyupEnter"
    />
    <ul class="dropdown-menu dropdown-menu-start">
      <li
        v-for="item in toggleSelect"
        :key="item.value"
        class="dropdown-item"
        @click="setPriority(item.value), setTextSelected(item.text)"
      >
        {{ item.text }}
      </li>
    </ul>

    <button
      type="button"
      class="btn btn-primary | fw-bolder"
      @click="onClickButton"
    >
      {{ textButton }}
    </button>
  </div>
</template>

<script>
import { TOGGLE_SELECT } from "@/store/enums";

export default {
  name: "TodoNewTask",

  props: {
    type: {
      type: String,
      default: "create",
      validator: (value) => value.match(/(create|edit)/),
    },

    taskToEdit: {
      type: Object,
    },
  },

  data() {
    return {
      value: "",
      priority: null,
      textSelected: "Prioridad",
      toggleSelect: TOGGLE_SELECT,
    };
  },

  mounted() {
    if (this.type === "edit") {
      this.priority = this.taskToEdit.priority;
      Object.keys(this.toggleSelect).forEach((index) => {
        if (this.toggleSelect[index].value === this.taskToEdit.priority) {
          this.textSelected = this.toggleSelect[index].text;
        }
      });
    }
  },

  computed: {
    placeholder() {
      return this.type === "edit" ? this.taskToEdit.title : "Nueva tarea";
    },

    textButton() {
      return this.type === "edit" ? "Editar" : "Nueva";
    },
  },

  methods: {
    sendValues() {
      if (this.type === "create" && this.value.length) {
        this.createTask();
      }
      if (this.type === "edit") {
        this.editTask();
      }
    },

    setPriority(value) {
      this.priority = value;
    },

    setTextSelected(value) {
      this.textSelected = value;
    },

    resetValues() {
      this.value = "";
      this.setPriority(null);
      this.setTextSelected("Prioridad");
    },

    createTask() {
      this.$emit("create-new-task", {
        title: this.value,
        priority: this.priority || 3,
        done: false,
      });
    },

    editTask() {
      this.$emit("edit-task", {
        title: this.value || this.taskToEdit.title,
        priority: this.priority || this.taskToEdit.priority,
        done: this.taskToEdit.done,
      });
    },

    onKeyupEnter() {
      if (this.type === "edit") return;
      this.sendValues();
      this.resetValues();
    },

    onClickButton() {
      this.sendValues();
      this.resetValues();
    },
  },
};
</script>

