import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

const state = {
  pageCategorias: { rows: [] },
  categoriasAtivas: [],
  descricoes: []
}

const mutations = {
  RECEIVE_CATEGORIAS(state, { pageCategorias }) {
    state.pageCategorias = pageCategorias
  },
  RECEIVE_CATEGORIAS_ATIVAS(state, { categoriasAtivas }) {
    state.categoriasAtivas = categoriasAtivas
  },
  RECEIVE_DESCRICOES(state, { descricoes }) {
    state.descricoes = descricoes
  },

}

const actions = {
  async GET_CATEGORIAS({ commit }, params) {
    const url = `${baseApiUrl}/categorias?nome=${params.nome}`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_CATEGORIAS', { pageCategorias: data });
    } catch (err) {
      showError(err);
    }
  },
  async GET_CATEGORIAS_ATIVAS({ commit }) {
    const url = `${baseApiUrl}/categorias/ativos`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_CATEGORIAS_ATIVAS', { categoriasAtivas: data });
    } catch (err) {
      showError(err);
    }
  },
  async GET_DESCRICOES({ commit }, id) {
    const url = `${baseApiUrl}/categorias/${id}/descricao`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_DESCRICOES', { descricoes: data });
    } catch (err) {
      showError(err);
    }
  }
},

  getters = {
    pageCategorias: state => state.pageCategorias,
    categoriasAtivas: state => state.categoriasAtivas,
    descricoes: state => state.descricoes
  }

export default {
  state,
  mutations,
  actions,
  getters
}