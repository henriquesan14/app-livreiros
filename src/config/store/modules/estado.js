import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

const state = {
  estados: [],
  cidades: []
}

const mutations = {
  RECEIVE_ESTADOS(state, { estados }) {
    state.estados = estados
  },
  RECEIVE_CIDADES(state, { cidades }) {
    state.cidades = cidades
  }
}

const actions = {
  async GET_ESTADOS({ commit }) {
    const url = `${baseApiUrl}/estados`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_ESTADOS', { estados: data });
    } catch (err) {
      showError(err);
    }
  },
  async GET_CIDADES({ commit }, params) {
    const url = `${baseApiUrl}/estados/${params.id}/cidades`;
    try {
      const { data } = await axios.get(url);
      commit('RECEIVE_CIDADES', { cidades: data });
    } catch (err) {
      showError(err);
    }
  },
  RESET_CIDADES({ commit }) {
    commit('RECEIVE_CIDADES', { cidades: [] })
  }
},

  getters = {
    estados: state => state.estados,
    cidades: state => state.cidades
  }

export default {
  state,
  mutations,
  actions,
  getters
}