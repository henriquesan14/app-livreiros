import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageCategorias: {rows: []}
}

const mutations = {
  RECEIVE_CATEGORIAS(state, {pageCategorias}) {
    state.pageCategorias = pageCategorias
  }
}

const actions = {
  async GET_CATEGORIAS ({commit}, params) {
    const url = `${baseApiUrl}/categorias?nome=${params.nome}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_CATEGORIAS',{ pageCategorias: data});
  }
},

getters =  {
    pageCategorias: state => state.pageCategorias
}

export default {
  state,
  mutations,
  actions,
  getters
}