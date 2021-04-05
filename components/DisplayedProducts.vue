<template>
  <div v-if="products.length > 0" class="container-fluid bg-dark">
    <div class="row py-3">
      <div class="col ps-4">
        <button
          class="btn btn-primary"
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
      <div class="col d-flex justify-content-end pe-4">
        <button
          class="btn btn-primary"
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
    <div class="row gx-3">
      <div v-for="product in products" :key="product._id" class="col">
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
