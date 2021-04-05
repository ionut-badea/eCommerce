<template>
  <div class="container d-flex justify-content-center mt-5">
    <h1 class="text-primary">
      {{ error.message }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: undefined,
      default: null,
    },
  },
}
</script>

<style scoped></style>
