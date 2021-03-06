import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

const state = {
  pageAssuntos: { rows: [] }
}

const mutations = {
  RECEIVE_ASSUNTOS(state, { pageAssuntos }) {
    state.pageAssuntos = pageAssuntos
  }
}

const actions = {
  async GET_ASSUNTOS({ commit }, params) {
    const url = `${baseApiUrl}/assuntos?pagina=${params.page}&nome=${params.nome}`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_ASSUNTOS', { pageAssuntos: data });
    } catch (err) {
      showError(err);
    }
  },
  RESET_ASSUNTOS({ commit }) {
    commit('RECEIVE_ASSUNTOS', { pageAssuntos: { rows: [] } });
  }
},

  getters = {
    pageAssuntos: state => state.pageAssuntos
  }

export default {
  state,
  mutations,
  actions,
  getters
}