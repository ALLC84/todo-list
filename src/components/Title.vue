<template>
  <h1 class="fw-bold">{{ text }}</h1>
</template>

<script>
export default {
  name: "Title",
  props: {
    text: {
      type: String,
      default: "Titulo de la app",
    },
  },
};
</script>
