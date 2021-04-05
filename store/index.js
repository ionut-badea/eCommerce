import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    allProducts: [],
    displayProducts: 0,
    inCartProducts: [],
    favorites: [],
    shipment: '5.45',
    windowWidth: 1920,
    windowSizes: {
      xs: [0, 576, 1],
      sm: [576, 768, 2],
      md: [768, 992, 2],
      lg: [992, 1200, 3],
      xl: [1200, 1400, 4],
      xxl: [1400, 14000, 5],
    },
  }
}

export const getters = {
  getField,
  getDisplayedProducts(state) {
    for (const size in state.windowSizes) {
      if (
        state.windowWidth >= state.windowSizes[size][0] &&
        state.windowWidth < state.windowSizes[size][1]
      ) {
        if (
          state.displayProducts >= 0 &&
          state.displayProducts + state.windowSizes[size][2] <=
            state.allProducts.length
        ) {
          return state.allProducts.slice(
            state.displayProducts,
            state.displayProducts + state.windowSizes[size][2]
          )
        } else if (
          state.displayProducts + state.windowSizes[size][2] >
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
        if (state.displayProducts >= 0) {
          if (
            state.displayProducts + state.windowSizes[size][2] >
            state.allProducts.length
          ) {
            state.displayProducts =
              state.allProducts.length - state.windowSizes[size][2]
          }
          if (
            operation === 'next' &&
            state.displayProducts + state.windowSizes[size][2] <
              state.allProducts.length
          ) {
            state.displayProducts += 1
            break
          } else if (operation === 'previous' && state.displayProducts > 0) {
            state.displayProducts -= 1
            break
          }
        }
      }
    }
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { error }) {
    try {
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
    } catch (e) {
      error(e)
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
