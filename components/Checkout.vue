<template>
  <div class="container bg-light p-4">
    <div class="row">
      <div class="col-7">
        <h2 class="h2">Products</h2>
      </div>
      <div class="col-5 h2 align-self-center text-end text-nowrap">
        <b>
          ${{ productsValue.toString().split('.')[0] }}
          <sup v-if="productsValue.toString().split('.')[1]">
            {{ productsValue.toString().split('.')[1].slice(0, 2) }}
          </sup>
          <sup v-else>00</sup>
        </b>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7">
        <h2 class="h2">Discount</h2>
      </div>
      <div class="col-5 h2 align-self-center text-end text-nowrap">
        <b>
          ${{ productsDiscountValue.toString().split('.')[0] }}
          <sup v-if="productsDiscountValue.toString().split('.')[1]">
            {{ productsDiscountValue.toString().split('.')[1].slice(0, 2) }}
          </sup>
          <sup v-else>00</sup>
        </b>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7">
        <h2 class="h2">Shipment</h2>
      </div>
      <div class="col-5 h2 align-self-center text-end text-nowrap">
        <b>
          ${{ shipment.split('.')[0] }}
          <sup>{{ shipment.split('.')[1] }}</sup>
        </b>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center text-danger">
      <div class="col-7">
        <h2 class="h2">
          <b>Total</b>
        </h2>
      </div>
      <div class="col-5 h2 align-self-center text-end text-nowrap">
        <b
          >${{ productsTotalValue.toString().split('.')[0] }}
          <sup v-if="productsTotalValue.toString().split('.')[1]">
            {{ productsTotalValue.toFixed(2).toString().split('.')[1] }}
          </sup>
          <sup v-else>00</sup>
        </b>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-primary btn-lg" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      shipment: (state) => state.shipment,
    }),
    ...mapGetters({
      productsValue: 'getCheckoutProductsValue',
      productsDiscountValue: 'getCheckoutProductsDiscountValue',
      productsTotalValue: 'getCheckoutProductsTotalValue',
    }),
  },
  methods: {
    checkout() {
      if (this.$store.state.inCartProducts.length > 0) {
        this.$router.push('/thanks')
        this.$store.commit('cleanCart')
      }
    },
  },
}
</script>

<style scoped></style>
