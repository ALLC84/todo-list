<template>
  <div class="mb-3">
    <!-- Status -->
    <div
      class="btn-group btn-group-sm | me-2"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnradiopriority"
        id="btnradio0"
        autocomplete="off"
        checked
        @click="setPriority(0)"
      />
      <label class="btn btn-outline-secondary" for="btnradio0">Todas</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradiopriority"
        id="btnradio1"
        autocomplete="off"
        @click="setPriority(3)"
      />
      <label class="btn btn-outline-secondary" for="btnradio1">Baja</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradiopriority"
        id="btnradio2"
        autocomplete="off"
        @click="setPriority(2)"
      />
      <label class="btn btn-outline-secondary" for="btnradio2">Media</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradiopriority"
        id="btnradio3"
        autocomplete="off"
        @click="setPriority(1)"
      />
      <label class="btn btn-outline-secondary" for="btnradio3">Alta</label>
    </div>
    <!-- Priority -->
    <div
      class="btn-group btn-group-sm"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnradiostatus"
        id="btnradio4"
        autocomplete="off"
        @click="setStatus(null)"
      />
      <label class="btn btn-outline-secondary" for="btnradio4">Todos</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradiostatus"
        id="btnradio6"
        autocomplete="off"
        checked
        @click="setStatus(false)"
      />
      <label class="btn btn-outline-secondary" for="btnradio6">Por hacer</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradiostatus"
        id="btnradio5"
        autocomplete="off"
        @click="setStatus(true)"
      />
      <label class="btn btn-outline-secondary" for="btnradio5"
        >Completados</label
      >
    </div>
  </div>
</template>

<script>
import { TOGGLE_SELECT } from "@/store/enums";
export default {
  name: "RadiobuttonFilters",

  data() {
    return {
      toggleSelect: TOGGLE_SELECT,
    };
  },

  methods: {
    setPriority(value) {
      this.$emit("change-priority-filter", value);
    },

    setStatus(value) {
      this.$emit("change-status-filter", value);
    },
  },
};
</script>
