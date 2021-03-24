<template>
  <div class="container text-light pb-3">
    <div class="row justify-content-between fs-5">
      <div class="col d-flex flex-row mb-1">
        <div v-for="star in stars" :id="star" :key="star">
          <span
            v-if="star <= rating"
            class="iconify text-warning"
            data-icon="ant-design:star-filled"
            data-inline="false"
          ></span>
          <span
            v-else
            class="iconify"
            data-icon="ant-design:star-filled"
            data-inline="false"
          ></span>
        </div>
        <p class="ms-2 mb-0">
          {{ rating }}
        </p>
      </div>
      <div class="col text-end mb-1">
        <p class="mb-0">({{ reviews }})</p>
      </div>
    </div>
    <div class="position-relative">
      <div class="position-absolute top-0">
        <button class="btn btn-light text-danger" @click="addToFavorites(uid)">
          <span
            class="iconify"
            data-icon="bi:heart-fill"
            data-inline="false"
            data-height="24"
            data-width="24"
          ></span>
        </button>
      </div>
      <div class="position-absolute top-0 end-0">
        <button class="btn btn-light text-primary" @click="addToCart(uid)">
          <span
            class="iconify"
            data-icon="bi:cart-plus"
            data-inline="false"
            data-heigth="28"
            data-width="28"
          ></span>
        </button>
      </div>
    </div>
    <div class="row">
      <img :src="image" :alt="name" class="" />
    </div>
    <div class="row fs-5">
      <div v-if="discount > 0" class="col">
        <p class="text-decoration-line-through">
          ${{ price.toString().split('.')[0] }}
          <sup>{{ price.toFixed(2).toString().split('.')[1] }}</sup>
        </p>
      </div>
      <div class="col">
        <p class="text-end">
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
    <h2 class="text-center fs-4">
      {{ name }}
    </h2>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      stars: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    ...mapMutations(['addToFavorites', 'addToCart']),
  },
}
</script>

<style scoped></style>
