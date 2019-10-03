const state = {
    pedido: {tipoPedido: 'balcao', nomeCliente: 'Selecione um cliente...', livrosDescritos: []},
}

const mutations = {
    RECEIVE_PEDIDO(state, pedido) {
        state.pedido = pedido;
    },
}

const actions = {
    SET_PEDIDO({ commit }, pedido) {
        commit('RECEIVE_PEDIDO', pedido);
    }
}

const getters = {
    pedido: state => state.pedido
}

export default {
    state,
    mutations,
    actions,
    getters
}