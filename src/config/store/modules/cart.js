const state = {
    cart: JSON.parse(localStorage.getItem('cart')) || {livrosDescritos: []},
}

const mutations = {
    RECEIVE_CART(state, { cart }) {
        state.cart = cart
    },
}

const actions = {
    SET_CART({ commit }) {
        commit('RECEIVE_CART', {cart: JSON.parse(localStorage.getItem('cart'))});
    },
    ZERA_CART({ commit }) {
        commit('RECEIVE_CART', {cart: {livrosDescritos: []}});
    },
}

const getters = {
    cart: state => state.cart
}

export default {
    state,
    mutations,
    actions,
    getters
}