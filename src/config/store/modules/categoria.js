import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageCategorias: {rows: []},
  categoriasAtivas: [],
  descricoes: []
}

const mutations = {
  RECEIVE_CATEGORIAS(state, {pageCategorias}) {
    state.pageCategorias = pageCategorias
  },
  RECEIVE_CATEGORIAS_ATIVAS(state, {categoriasAtivas}){
    state.categoriasAtivas = categoriasAtivas
  },
  RECEIVE_DESCRICOES(state, {descricoes}){
    state.descricoes = descricoes
  },

}

const actions = {
  async GET_CATEGORIAS ({commit}, params) {
    const url = `${baseApiUrl}/categorias?nome=${params.nome}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_CATEGORIAS',{ pageCategorias: data});
  },
  async GET_CATEGORIAS_ATIVAS ({commit}) {
    const url = `${baseApiUrl}/categorias/ativos`;
    const { data } = await axios.get(url);
    commit('RECEIVE_CATEGORIAS_ATIVAS',{ categoriasAtivas: data});
  },
  async GET_DESCRICOES({commit}, id){
    const url = `${baseApiUrl}/categorias/${id}/descricao`;
    const {data} = await axios.get(url);
    commit('RECEIVE_DESCRICOES', {descricoes: data});
  }
},

getters =  {
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