<template>
  <h1 class="fw-bold">{{ text }}</h1>
</template>

<script>
export default {
  name: "Title",
  props: {
    text: String,
  },
};
</script>
