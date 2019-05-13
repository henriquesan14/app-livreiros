import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  estados: [],
  cidades: []
}

const mutations = {
  RECEIVE_ESTADOS (state, {estados}) {
    state.estados = estados
  },
  RECEIVE_CIDADES(state, {cidades}){
    state.cidades = cidades
  }
}

const actions = {
  async GETALL ({commit}) {
    const url = `${baseApiUrl}/estados`;
    const { data } = await axios.get(url);
    commit('RECEIVE_ESTADOS',{ estados: data});
  },
  async GETCIDADES({commit}, params){
    const url = `${baseApiUrl}/cidades/${params.id}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_CIDADES',{ cidades: data});
  }
},

getters =  {
  estados: state => state.estados,
  cidades: state => state.cidades
}

export default {
  state,
  mutations,
  actions,
  getters
}