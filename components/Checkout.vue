<template>
  <div id="checkout" class="container has-background-light">
    <div class="columns is-marginless is-vcentered is-mobile">
      <div class="column is-paddingless px-2 pt-3 pb-1">
        <h2
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop is-marginless"
        >
          Products
        </h2>
      </div>
      <div class="column is-paddingless has-text-right px-2 pt-3 pb-1">
        <div
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop"
        >
          <b
            >${{ productsValue.toString().split('.')[0] }}
            <sup v-if="productsValue.toString().split('.')[1]">
              {{ productsValue.toString().split('.')[1].slice(0, 2) }}
            </sup>
            <sup v-else>00</sup>
          </b>
        </div>
      </div>
    </div>
    <div class="columns is-marginless is-vcentered is-mobile">
      <div class="column is-paddingless px-2 py-1">
        <h2
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop is-marginless"
        >
          Discount
        </h2>
      </div>
      <div class="column is-paddingless has-text-right px-2 py-1">
        <div
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop"
        >
          <b
            >${{ productsDiscountValue.toString().split('.')[0] }}
            <sup v-if="productsDiscountValue.toString().split('.')[1]">
              {{ productsDiscountValue.toString().split('.')[1].slice(0, 2) }}
            </sup>
            <sup v-else>00</sup>
          </b>
        </div>
      </div>
    </div>
    <div class="columns is-marginless is-vcentered is-mobile">
      <div class="column is-paddingless px-2 py-1">
        <h2
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop is-marginless"
        >
          Shipment
        </h2>
      </div>
      <div class="column is-paddingless has-text-right px-2 py-1">
        <div
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop"
        >
          <b>
            ${{ shipment.split('.')[0] }}
            <sup>{{ shipment.split('.')[1] }}</sup>
          </b>
        </div>
      </div>
    </div>
    <div class="columns is-marginless is-vcentered is-mobile">
      <div class="column is-paddingless px-2 pt-1 pb-3">
        <h2
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop is-marginless"
        >
          <b>Total</b>
        </h2>
      </div>
      <div
        class="column is-paddingless has-text-right has-text-danger px-2 pt-1 pb-3"
      >
        <div
          class="content is-size-3-mobile is-size-3-tablet is-size-4-desktop"
        >
          <b
            >${{ productsTotalValue.toString().split('.')[0] }}
            <sup v-if="productsTotalValue.toString().split('.')[1]">
              {{ productsTotalValue.toFixed(2).toString().split('.')[1] }}
            </sup>
            <sup v-else>00</sup>
          </b>
        </div>
      </div>
    </div>
    <div class="columns is-vcentered is-centered is-mobile">
      <div class="column is-8 has-text-centered">
        <button
          id="checkout-button"
          class="button is-primary is-size-3-mobile is-size-3-tablet is-size-5-desktop"
          @click="checkout"
        >
          Checkout
        </button>
      </div>
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
        this.$router.push('/thank-you')
        this.$store.commit('cleanCart')
      }
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  #checkout {
    border-radius: 3rem;
  }
  #checkout-button {
    border-radius: 1rem !important;
  }
}
@media only screen and (min-width: 769px) {
  #checkout {
    border-radius: 1.5rem;
  }
  #checkout-button {
    border-radius: 0.5rem !important;
  }
}
</style>
