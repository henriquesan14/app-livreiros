import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  assuntos: []
}

const mutations = {
  RECEIVE_ASSUNTOS(state, {assuntos}) {
    state.assuntos = assuntos
  }
}

const actions = {
  async GET_ASSUNTOS ({commit}, params) {
    const url = `${baseApiUrl}/assuntos?nome=${params.nome}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_ASSUNTOS',{ assuntos: data});
  }
},

getters =  {
    assuntos: state => state.assuntos
}

export default {
  state,
  mutations,
  actions,
  getters
}