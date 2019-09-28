import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

const state = {
  pageAutores: { rows: [] }
}

const mutations = {
  RECEIVE_AUTORES(state, { pageAutores }) {
    state.pageAutores = pageAutores
  }
}

const actions = {
  async GET_AUTORES({ commit }, params) {
    const url = `${baseApiUrl}/autores?nome=${params.nome}`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_AUTORES', { pageAutores: data });
    } catch (err) {
      showError(err);
    }
  },
  RESET_AUTORES({ commit }) {
    commit('RECEIVE_AUTORES', { pageAutores: { rows: [] } });
  }
},

  getters = {
    pageAutores: state => state.pageAutores
  }

export default {
  state,
  mutations,
  actions,
  getters
}