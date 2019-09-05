import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

const state = {
  pageEditoras: { rows: [] }
}

const mutations = {
  RECEIVE_EDITORAS(state, { pageEditoras }) {
    state.pageEditoras = pageEditoras
  }
}

const actions = {
  async GET_EDITORAS({ commit }, params) {
    const url = `${baseApiUrl}/editoras?nome=${params.nome}`;
    try{
      const { data } = await axios.get(url);
      commit('RECEIVE_EDITORAS', { pageEditoras: data });
    }catch(err){
      showError(err);
    }
  },
  RESET_EDITORAS({ commit }) {
    commit('RECEIVE_EDITORAS', { pageEditoras: { rows: [] } });
  }
},

  getters = {
    pageEditoras: state => state.pageEditoras
  }

export default {
  state,
  mutations,
  actions,
  getters
}