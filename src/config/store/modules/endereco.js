const state = {
    endereco: {
        idUf: null,
        idCidade: null
    }
}

const mutations = {
    RECEIVE_ENDERECO(state, { endereco }) {
        state.endereco = endereco
    }
}

const actions = {
    SET_ENDERECO({ commit }, endereco) {
        commit('RECEIVE_ENDERECO', endereco);
    },
    RESET_ENDERECO({ commit }) {
        commit('RECEIVE_ENDERECO', { endereco: { idUf: null, idCidade: null } });
    },
},

    getters = {
        endereco: state => state.endereco,
    }

export default {
    state,
    mutations,
    actions,
    getters
}