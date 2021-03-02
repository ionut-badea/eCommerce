<template>
  <div>
    <div class="wrapper">
      <Header></Header>
      <Nuxt />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {}
</script>

<style>
div.wrapper {
  min-height: calc(100vh - 48px);
}
</style>
