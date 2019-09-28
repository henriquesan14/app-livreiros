import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

const state = {
  pageLivros: { rows: [] },
  livro: {
    acabamentoLivro: null,
    condicaoLivro: null
  },
  livroSelecionado: null
}

const mutations = {
  RECEIVE_LIVROS(state, { pageLivros }) {
    state.pageLivros = pageLivros
  },
  RECEIVE_LIVRO(state, { livro }) {
    state.livro = livro
  },
  RECEIVE_LIVRO_SELECIONADO(state, { idLivro }) {
    state.livroSelecionado = idLivro
  }
}

const actions = {
  async GET_LIVROS({ commit }, params) {
    const url = `${baseApiUrl}/livros?busca=${params.busca}&pagina=${params.pagina}`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_LIVROS', { pageLivros: data });
    } catch (err) {
      showError(err);
    }
  },
  SET_LIVRO({ commit }, livro) {
    commit('RECEIVE_LIVRO', livro);
  },
  RESET_LIVRO({ commit }) {
    commit('RECEIVE_LIVRO', { livro: { acabamentoLivro: null, condicaoLivro: null } });
  },
  SET_LIVRO_SELECIONADO({ commit }, idLivro) {
    commit('RECEIVE_LIVRO_SELECIONADO', idLivro);
  }
},

  getters = {
    pageLivros: state => state.pageLivros,
    livro: state => state.livro,
    livroSelecionado: state => state.livroSelecionado
  }

export default {
  state,
  mutations,
  actions,
  getters
}