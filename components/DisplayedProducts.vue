<template>
  <div id="similar_products" class="has-background-dark my-6 py-5">
    <div class="columns is-marginless is-vcentered is-mobile">
      <div class="column is-6 pl-5">
        <button
          class="button is-large is-info"
          @click="updateDisplayedProducts('previous')"
        >
          <span
            class="iconify"
            data-icon="grommet-icons:previous"
            data-inline="false"
            data-height="36"
            data-width="36"
          ></span>
        </button>
      </div>
      <div class="column is-6 has-text-right pr-5">
        <button
          class="button is-large is-info"
          @click="updateDisplayedProducts('next')"
        >
          <span
            class="iconify"
            data-icon="grommet-icons:next"
            data-inline="false"
            data-height="36"
            data-width="36"
          ></span>
        </button>
      </div>
    </div>
    <div class="columns is-marginless is-mobile">
      <div
        v-for="product in products"
        :key="product._id"
        class="column is-6-mobile px-5"
      >
        <DisplayedProduct
          :uid="product._id"
          :name="product.name"
          :price="product.price"
          :discount="product.discount"
          :rating="product.rating"
          :reviews="product.reviews"
          :image="product.image"
        ></DisplayedProduct>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'getDisplayedProducts',
    }),
  },
  mounted() {
    this.$store.dispatch('calculateWindowWidth')
  },
  methods: {
    ...mapMutations(['updateDisplayedProducts']),
  },
}
</script>

<style scoped></style>
