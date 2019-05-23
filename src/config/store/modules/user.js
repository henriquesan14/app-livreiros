import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageUsers: {rows: []},
  grupos: {},
  permissoes: [] 
}

const mutations = {
  RECEIVE_USERS (state, {pageUsers}) {
    state.pageUsers = pageUsers
  },
  RECEIVE_GRUPOS(state, {grupos}){
    state.grupos = grupos
  },
  RECEIVE_PERMISSOES(state, {permissoes}){
    state.permissoes = permissoes
  }
}

const actions = {
  async GET_USERS ({commit}, params) {
    const url = `${baseApiUrl}/usuarios?nome=${params.nome}&pagina=${params.page}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_USERS',{ pageUsers: data});
  },
  async GET_GRUPOS ({commit}) {
    const url = `${baseApiUrl}/grupos`;
    const { data } = await axios.get(url);
    commit('RECEIVE_GRUPOS',{ grupos: data});
  },
  async GET_PERMISSOES ({commit}, categoria) {
    
    const url = `${baseApiUrl}/permissoes?categoria=${categoria}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_PERMISSOES',{ permissoes: data});
  }
},

getters =  {
    pageUsers: state => state.pageUsers,
    grupos: state => state.grupos,
    permissoes: state => state.permissoes
}

export default {
  state,
  mutations,
  actions,
  getters
}