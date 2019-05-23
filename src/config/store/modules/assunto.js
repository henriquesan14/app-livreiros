import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageAssuntos: {rows: []}
}

const mutations = {
  RECEIVE_ASSUNTOS(state, {pageAssuntos}) {
    state.pageAssuntos = pageAssuntos
  }
}

const actions = {
  async GET_ASSUNTOS ({commit}, params) {
    const url = `${baseApiUrl}/assuntos?nome=${params.nome}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_ASSUNTOS',{ pageAssuntos: data});
  }
},

getters =  {
  pageAssuntos: state => state.pageAssuntos
}

export default {
  state,
  mutations,
  actions,
  getters
}