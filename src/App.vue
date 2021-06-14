<template>
  <div id="app">
    <!-- Modal -->
    <transition name="fade">
      <Modal v-if="showModal" />
    </transition>
    <!-- header -->
    <header
      class="d-flex align-items-center justify-content-between | mt-4 mb-4"
    >
      <div class="d-flex align-items-center">
        <!-- <img
          class="rounded-circle | me-3"
          alt="Vue logo"
          src="./assets/imgAbout.jpg"
          height="60px"
          width="60px"
        /> -->
        <Title :text="title" />
      </div>
      <button
        class="btn btn-danger | fw-bolder"
        @click="onClickButtonDeleteAll"
      >
        Borrar todas
      </button>
    </header>
    <!-- Todo List -->
    <TodoList />
  </div>
</template>

<script>
import Modal from "./components/TodoList/Modal";
import TodoList from "./components/TodoList";
import Title from "./components/Title";
import swal from "sweetalert";
import { lsGetTodos } from "@/utils/helpers/storage";
import {
  TODOS_GET_AND_LOAD_TO_STORAGE,
  TODO_DELETE_ALL,
} from "@/store/actions/todos";

export default {
  name: "App",
  components: {
    Modal,
    Title,
    TodoList,
  },

  mounted() {
    const initialState = lsGetTodos();
    if (initialState) {
      this.$store.dispatch(
        `todo/${TODOS_GET_AND_LOAD_TO_STORAGE}`,
        initialState
      );
    } else {
      this.$store.dispatch(`todo/${TODOS_GET_AND_LOAD_TO_STORAGE}`, []);
    }
  },

  computed: {
    title() {
      return this.$store.getters["state"]("title");
    },

    showModal() {
      return this.$store.getters["todo/state"]("modal");
    },
  },

  methods: {
    onClickButtonDeleteAll() {
      swal({
        title: "Estas seguro ?",
        text: "Se eliminarán todas las tareas para siempre!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch(`todo/${TODO_DELETE_ALL}`);
          swal("Todas las tareas han sido eliminadas!", {
            icon: "success",
          });
        } else {
          swal("Nada ha pasado, tus tareas sigue tal cual!");
        }
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 10px;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
