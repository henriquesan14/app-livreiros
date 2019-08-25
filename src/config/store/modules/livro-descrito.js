
const state = {
  livroDescrito: { descricoes: [] }
}

const mutations = {
  RECEIVE_LIVRO_DESCRITO (state, {livroDescrito}) {
    state.livroDescrito = livroDescrito
  }
}

const actions = {
  SET_LIVRO_DESCRITO({commit}, livroDescrito){
    commit('RECEIVE_LIVRO_DESCRITO', livroDescrito);
  },
  RESET_LIVRO_DESCRITO({commit}){
    commit('RECEIVE_LIVRO_DESCRITO', {livroDescrito: { descricoes: [] }});
  }
},

getters =  {
  livroDescrito: state => state.livroDescrito
}

export default {
  state,
  mutations,
  actions,
  getters
}