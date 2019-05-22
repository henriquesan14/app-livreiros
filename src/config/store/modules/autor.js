import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  autores: []
}

const mutations = {
  RECEIVE_AUTORES(state, {autores}) {
    state.autores = autores
  }
}

const actions = {
  async GET_AUTORES ({commit}, params) {
    const url = `${baseApiUrl}/autores?nome=${params.nome}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_AUTORES',{ autores: data});
  }
},

getters =  {
    autores: state => state.autores
}

export default {
  state,
  mutations,
  actions,
  getters
}