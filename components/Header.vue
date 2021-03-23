<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid py-2">
      <a href="/">
        <img src="logo.svg" alt="eCommerce" />
      </a>
      <button
        class="navbar-toggler text-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
        aria-controls="menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          class="iconify"
          data-icon="cil:hamburger-menu"
          data-inline="false"
          data-height="48"
        ></span>
      </button>
      <div id="menu" class="collapse navbar-collapse container-fluid">
        <div class="container-lg mx-3">
          <input
            id="search"
            type="text"
            placeholder="search"
            name="search"
            class="form-control w-75"
          />
        </div>
        <ul class="navbar-nav mx-3">
          <li id="account" class="nav-item text-light mx-3">
            <span
              class="iconify"
              data-icon="ant-design:user-outlined"
              data-inline="false"
              data-height="36"
            ></span>
          </li>
          <li id="favorites" class="nav-item text-light mx-3">
            <span
              class="iconify"
              data-icon="ant-design:heart-outlined"
              data-inline="false"
              data-height="36"
            ></span>
            <span v-if="favorites > 0" class="">
              {{ favorites }}
            </span>
          </li>
          <li id="cart" class="nav-item text-light mx-3">
            <span
              class="iconify"
              data-icon="feather:shopping-cart"
              data-inline="false"
              data-height="36"
            ></span>
            <span v-if="inCartProducts > 0" class="">
              {{ inCartProducts }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    ...mapState({
      favorites: (state) => state.favorites.length,
      inCartProducts: (state) => state.inCartProducts.length,
    }),
  },
}
</script>

<style scoped></style>
