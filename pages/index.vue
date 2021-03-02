<template>
  <div class="columns is-marginless is-desktop">
    <div
      class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-7-desktop is-offset-1-desktop is-6-widescreen is-offset-1-widescreen"
    >
      <CartProduct
        v-for="product in products"
        :key="product._id"
        :uid="product._id"
        :name="product.name"
        :price="product.price"
        :discount="product.discount"
        :stock="product.stock"
        :quantity="product.quantity"
        :image="product.image"
        class="my-5"
      ></CartProduct>
    </div>
    <div
      class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-3-desktop is-offset-0-desktop is-4-widescreen"
    >
      <Checkout class="my-5"></Checkout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'getInCartProducts',
    }),
  },
}
</script>

<style></style>
