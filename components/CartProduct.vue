<template>
  <div id="product" class="container has-background-light">
    <div
      id="row_1"
      class="columns is-marginless is-tablet has-text-centered-mobile"
    >
      <div id="image" class="column is-3">
        <img :src="image" :alt="name" class="image" />
      </div>
      <div id="name" class="column is-9">
        <h2 class="title is-size-4 has-text-dark is-marginless">
          {{ name }}
        </h2>
      </div>
    </div>
    <div
      id="row_2"
      class="columns is-marginless is-tablet has-text-centered-mobile"
    >
      <div id="quantity" class="column is-3">
        <p
          id="quantity_text"
          class="content is-marginless is-size-4-mobile is-size-5 has-text-dark"
        >
          Quantity:
        </p>
        <b
          id="quantity_number"
          class="content is-marginless is-size-4-mobile is-size-5 has-text-dark"
          >{{ quantity }}</b
        >
        <button
          id="decrease_quantity"
          class="button is-small is-info is-paddingless p-1"
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
          id="increase_quantity"
          class="button is-small is-info is-paddingless p-1"
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
      <div id="actions" class="column is-5 has-text-centered-tablet">
        <button
          id="favorites"
          class="button is-paddingless is-link mx-2 p-2"
          @click="addToFavorites(uid)"
        >
          <span
            class="iconify"
            data-icon="bi:heart-fill"
            data-inline="false"
            data-height="24"
            data-width="24"
          ></span>
        </button>
        <button
          id="delete"
          class="button is-paddingless is-danger mx-2 p-2"
          @click="deleteFromCart(uid)"
        >
          <span
            class="iconify"
            data-icon="fluent:delete-24-filled"
            data-inline="false"
            data-height="24"
            data-width="24"
          ></span>
        </button>
      </div>
      <div id="price" class="column is-4 has-text-right-tablet">
        <p
          v-if="discount > 0"
          id="full_price"
          class="content is-marginless is-size-4-mobile is-size-5-tablet has-text-grey"
        >
          ${{ price.toString().split('.')[0] }}
          <sup>{{ price.toFixed(2).toString().split('.')[1] }}</sup>
        </p>
        <p
          id="discounted_price"
          class="content is-marginless is-size-3-mobile is-size-4-tablet has-text-dark"
        >
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

<style scoped>
#quantity {
  display: grid;
}
#quantity_text {
  grid-area: text;
}
#quantity_number {
  grid-area: number;
}
#decrease_quantity {
  grid-area: decrease;
}
#increase_quantity {
  grid-area: increase;
}
#full_price {
  text-decoration: line-through;
}
@media only screen and (max-width: 768px) {
  #product {
    border-radius: 3rem;
  }
  img.image {
    border-radius: 1.5rem;
  }
  #row_1,
  #row_2 {
    padding: 3rem;
  }
  #row_1 {
    padding-bottom: 0.75rem !important;
  }
  #row_2 {
    padding-top: 0.75rem !important;
  }
  #quantity {
    grid-template-areas: '. text number decrease increase .';
    grid-template-columns: 1fr 1fr 3rem 3rem 3rem 1fr;
    align-items: center;
    justify-items: center;
  }
  #increase_quantity,
  #decrease_quantity {
    border-radius: 0.25rem;
  }
}
@media only screen and (min-width: 769px) {
  #product {
    border-radius: 1.5rem;
  }
  img.image {
    border-radius: 0.75rem;
  }
  #row_1,
  #row_2 {
    padding: 1rem;
  }
  #row_1 {
    padding-bottom: 0rem !important;
  }
  #row_2 {
    padding-top: 0rem !important;
  }
  #quantity {
    grid-template-areas:
      'text number'
      'decrease increase';
    grid-template-columns: 1fr 4rem;
    align-items: center;
    justify-items: center;
  }
  #quantity_text,
  #decrease_quantity {
    justify-self: end !important;
  }

  #increase_quantity,
  #decrease_quantity {
    border-radius: 0.25rem;
  }
}
</style>
