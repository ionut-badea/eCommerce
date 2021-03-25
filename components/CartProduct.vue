<template>
  <div class="container bg-light my-3 p-4">
    <div class="row">
      <div class="col-lg-4">
        <img :src="image" :alt="name" class="img-thumbnail" />
      </div>
      <div class="col-lg-8">
        <h2 class="title text-center text-lg-start">
          {{ name }}
        </h2>
      </div>
    </div>
    <div class="row d-flex flex-column flex-lg-row">
      <div class="col col-lg-4 text-center">
        <p class="fs-4">
          Quantity: <b>{{ quantity }}</b>
        </p>
        <button
          class="btn btn-dark btn-sm"
          @click="changeQuantity({ uid, operation: 'decrease' })"
        >
          <span
            class="iconify"
            data-icon="el:minus"
            data-inline="false"
            data-height="16"
          ></span>
        </button>
        <button
          class="btn btn-dark btn-sm"
          @click="changeQuantity({ uid, operation: 'increase' })"
        >
          <span
            class="iconify"
            data-icon="bx:bx-plus-medical"
            data-inline="false"
            data-height="16"
          ></span>
        </button>
      </div>
      <div class="col col-lg-4 text-center">
        <button class="btn btn-light text-danger" @click="addToFavorites(uid)">
          <span
            class="iconify"
            data-icon="bi:heart-fill"
            data-inline="false"
            data-height="36"
            data-width="36"
          ></span>
        </button>
        <button
          class="btn btn-light text-secondary"
          @click="deleteFromCart(uid)"
        >
          <span
            class="iconify"
            data-icon="fluent:delete-24-filled"
            data-inline="false"
            data-height="44"
            data-width="44"
          ></span>
        </button>
      </div>
      <div class="col col-lg-4 text-center text-lg-end fs-3">
        <p v-if="discount > 0" class="text-decoration-line-through">
          ${{ price.toString().split('.')[0] }}
          <sup>{{ price.toFixed(2).toString().split('.')[1] }}</sup>
        </p>
        <p>
          ${{ (price - (price * discount) / 100).toString().split('.')[0] }}
          <sup>
            {{
              (price - (price * discount) / 100)
                .toFixed(2)
                .toString()
                .split('.')[1]
            }}
          </sup>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  props: {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapMutations(['addToFavorites']),
    ...mapActions(['changeQuantity', 'deleteFromCart']),
  },
}
</script>

<style scoped></style>
