<template>
  <div class="has-background-primary">
    <div class="columns is-marginless is-vcentered is-mobile">
      <div
        id="logo"
        class="column is-offset-1 is-8-mobile is-8-tablet is-3-desktop"
      >
        <a href="/">
          <img src="logo.svg" alt="" class="image" />
        </a>
      </div>
      <div id="menu" class="column is-0-tablet is-4-desktop is-3-widescreen">
        <input
          id="search"
          type="text"
          placeholder="search"
          name="search"
          class="input has-text-primary"
        />
      </div>
      <div id="menu" class="column is-0-tablet is-3-desktop is-4-widescreen">
        <div class="columns is-marginless">
          <div id="account" class="column has-text-light">
            <span
              class="iconify"
              data-icon="ant-design:user-outlined"
              data-inline="false"
              data-height="36"
            ></span>
          </div>
          <div id="favorites" class="column has-text-light">
            <span
              class="iconify"
              data-icon="ant-design:heart-outlined"
              data-inline="false"
              data-height="36"
            ></span>
            <span v-if="favorites > 0" class="has-text-light p-1">
              {{ favorites }}
            </span>
          </div>
          <div id="cart" class="column has-text-light">
            <span
              class="iconify"
              data-icon="feather:shopping-cart"
              data-inline="false"
              data-height="36"
            ></span>
            <span v-if="inCartProducts > 0" class="has-text-light p-1">
              {{ inCartProducts }}
            </span>
          </div>
        </div>
      </div>
      <div id="hamburger" class="column is-2-mobile is-2-tablet">
        <span
          class="iconify"
          data-icon="cil:hamburger-menu"
          data-inline="false"
          data-height="48"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      favorites: (state) => state.favorites.length,
      inCartProducts: (state) => state.inCartProducts.length,
    }),
  },
}
</script>

<style scoped>
img#logo {
  min-height: 75px !important;
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}
@media only screen and (max-width: 1023px) {
  #menu {
    display: none;
  }
  #hamburger {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
@media only screen and (min-width: 1023px) {
  #hamburger {
    display: none;
  }
  #account,
  #favorites,
  #cart {
    display: flex;
    align-items: center !important;
  }
  #favorites div,
  #cart div {
    border-radius: 1rem;
  }
  #favorites {
    justify-content: center;
  }
  #cart {
    justify-content: flex-end;
  }
}
</style>
