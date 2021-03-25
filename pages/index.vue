<template>
  <div class="container-fluid">
    <div class="row justify-content-around my-5 mx-0">
      <div class="col-11 col-sm-11 col-md-10 col-lg-7 col-xl-8">
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
        ></CartProduct>
      </div>
      <div class="col-11 col-sm-11 col-md-10 col-lg-5 col-xl-4">
        <Checkout></Checkout>
      </div>
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
