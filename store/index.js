import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    allProducts: [],
    firstProduct: 0,
    inCartProducts: [],
    favorites: [],
    shipment: '5.45',
    windowWidth: 1920,
    windowSizes: {
      mobile: [0, 768, 2],
      table: [769, 1023, 3],
      desktop: [1024, 1215, 4],
      widescreen: [1216, 1408, 4],
      fullhd: [1408, 15000, 5],
    },
  }
}

export const getters = {
  getField,
  getDisplayedProducts(state) {
    for (const size in state.windowSizes) {
      if (
        state.windowWidth >= state.windowSizes[size][0] &&
        state.windowWidth <= state.windowSizes[size][1]
      ) {
        if (
          state.firstProduct >= 0 &&
          state.firstProduct + state.windowSizes[size][2] <=
            state.allProducts.length
        ) {
          return state.allProducts.slice(
            state.firstProduct,
            state.firstProduct + state.windowSizes[size][2]
          )
        } else if (
          state.firstProduct + state.windowSizes[size][2] >
          state.allProducts.length
        ) {
          return state.allProducts.slice(
            state.allProducts.length - state.windowSizes[size][2],
            state.allProducts.length
          )
        }
      }
    }
  },
  getInCartProducts(state) {
    return state.allProducts.filter((product) =>
      state.inCartProducts.includes(product._id)
    )
  },
  getCheckoutProductsValue(state, getters) {
    if (state.inCartProducts.length > 0) {
      return getters.getInCartProducts
        .map((product) => product.price * product.quantity)
        .reduce((total, price) => {
          return total + price
        }, 0)
    } else {
      return 0.0
    }
  },
  getCheckoutProductsDiscountValue(state, getters) {
    if (state.inCartProducts.length > 0) {
      return getters.getInCartProducts
        .map(
          (product) =>
            (product.price * product.quantity * product.discount) / 100
        )
        .reduce((total, priceDiscounted) => {
          return total + priceDiscounted
        }, 0)
    } else {
      return 0.0
    }
  },
  getCheckoutProductsTotalValue(state, getters) {
    if (state.inCartProducts.length > 0) {
      return (
        getters.getInCartProducts
          .map(
            (product) =>
              product.price * product.quantity -
              (product.price * product.quantity * product.discount) / 100
          )
          .reduce((total, priceDiscounted) => {
            return total + priceDiscounted
          }, 0) + parseFloat(state.shipment)
      )
    } else {
      return 0.0
    }
  },
}

export const mutations = {
  updateField,
  saveAllProducts(state, product) {
    state.allProducts.push(product)
  },
  addToFavorites(state, uid) {
    if (!state.favorites.includes(uid)) {
      state.favorites.push(uid)
    }
  },
  removeFromFavorites() {},
  addToCart(state, uid) {
    if (!state.inCartProducts.includes(uid)) {
      state.inCartProducts.push(uid)
    }
  },
  removeFromCart(state, uid) {
    const index = state.inCartProducts.indexOf(uid)
    if (index > -1) {
      state.inCartProducts.splice(index, 1)
    }
  },
  cleanCart(state) {
    state.inCartProducts = []
  },
  updateQuantity(state, { uid, quantity }) {
    state.allProducts
      .filter((product) => product._id === uid)
      .map((product) => (product.quantity = quantity))
  },
  updateWindowWidth(state, width) {
    state.windowWidth = width
  },
  updateDisplayedProducts(state, operation) {
    for (const size in state.windowSizes) {
      if (
        state.windowWidth >= state.windowSizes[size][0] &&
        state.windowWidth <= state.windowSizes[size][1]
      ) {
        if (state.firstProduct >= 0) {
          if (
            state.firstProduct + state.windowSizes[size][2] >
            state.allProducts.length
          ) {
            state.firstProduct =
              state.allProducts.length - state.windowSizes[size][2]
          }
          if (
            operation === 'next' &&
            state.firstProduct + state.windowSizes[size][2] <
              state.allProducts.length
          ) {
            state.firstProduct += 1
            break
          } else if (operation === 'previous' && state.firstProduct > 0) {
            state.firstProduct -= 1
            break
          }
        }
      }
    }
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const products = await this.$axios({
      method: 'POST',
      data: {
        query: `
        query{
          products{
            _id
            name,
            price,
            discount,
            rating,
            reviews,
            stock,
            quantity,
            image
          }
        }
      `,
      },
    })
    const allProducts = products.data.data.products
    for (const product in allProducts) {
      commit('saveAllProducts', allProducts[product])
    }
  },
  changeQuantity({ state, commit }, { uid, operation }) {
    state.allProducts
      .filter((product) => product._id === uid)
      .map((product) => {
        if (operation === 'increase' && product.quantity < product.stock) {
          commit('updateQuantity', { uid, quantity: product.quantity + 1 })
        } else if (operation === 'decrease' && product.quantity > 1) {
          commit('updateQuantity', { uid, quantity: product.quantity - 1 })
        } else if (operation === 'decrease' && product.quantity === 1) {
          commit('updateQuantity', { uid, quantity: 1 })
          commit('removeFromCart', uid)
        }
      })
  },
  calculateWindowWidth({ commit }) {
    if (process.client) {
      window.addEventListener('resize', () => {
        commit('updateWindowWidth', window.innerWidth)
      })
    }
  },
  deleteFromCart({ commit }, uid) {
    commit('updateQuantity', { uid, quantity: 1 })
    commit('removeFromCart', uid)
  },
}
