<template>
  <div id="similar_product" class="container">
    <div class="columns is-marginless is-vcentered is-mobile mb-1">
      <div class="column is-paddingless has-text-primary is-9 star">
        <span
          v-for="star in stars"
          :id="star"
          :key="star"
          class="iconify is-size-5"
          data-icon="ant-design:star-filled"
          data-inline="false"
        ></span>
        <p class="is-size-5 px-2">
          {{ rating }}
        </p>
      </div>
      <div class="column is-paddingless">
        <p
          class="content is-marginless has-text-light has-text-right is-size-5"
        >
          ({{ reviews }})
        </p>
      </div>
    </div>
    <div id="image" class="container">
      <button
        id="add_to_favorites"
        class="button is-paddingless is-small is-link p-2"
        @click="addToFavorites(uid)"
      >
        <span
          class="iconify has-text-light"
          data-icon="bi:heart-fill"
          data-inline="false"
          data-height="18"
          data-width="18"
        ></span>
      </button>
      <button
        id="add_to_cart"
        class="button is-paddingless is-small is-primary p-2"
        @click="addToCart(uid)"
      >
        <span
          class="iconify"
          data-icon="bi:cart-plus"
          data-inline="false"
          data-heigth="24"
          data-width="24"
        ></span>
      </button>
      <img :src="image" :alt="name" class="image" />
    </div>
    <div class="columns is-marginless is-mobile my-1">
      <div class="column is-paddingless">
        <p id="full_price" class="has-text-grey is-size-5">
          ${{ price.toString().split('.')[0] }}
          <sup>{{ price.toFixed(2).toString().split('.')[1] }}</sup>
        </p>
      </div>
      <div class="column is-paddingless">
        <p class="has-text-light has-text-right is-size-5">
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
    <h2 class="has-text-centered has-text-light is-size-5">
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

<style scoped>
img.image {
  border-radius: 1rem;
}
div.star {
  display: flex;
  flex-direction: row;
  align-items: center !important;
}
#add_to_favorites {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  border-radius: 0.25rem;
}
#add_to_cart {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  border-radius: 0.25rem;
}
#full_price {
  text-decoration: line-through;
}
</style>
