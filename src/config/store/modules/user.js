import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageUsers: {rows: []},
  grupos: {},
  permissoes: [],
  user: {idUf: null, idCidade: null, grupos: []},
  grupo: {permissoes: []}
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
  },
  RECEIVE_USER(state, {user}){
    state.user = user
  },
  RECEIVE_GRUPO(state, {grupo}){
    state.grupo = grupo
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
  async GET_PERMISSOES ({commit}) {
    const url = `${baseApiUrl}/permissoes`;
    const { data } = await axios.get(url);
    commit('RECEIVE_PERMISSOES',{ permissoes: data});
  },
  SET_USER({commit}, user){
    commit('RECEIVE_USER', user);
  },
  RESET_USER({commit}){
    commit('RECEIVE_USER', {user: {idUf: null, idCidade: null, grupos: []}});
  },
  SET_GRUPO({commit}, user){
    commit('RECEIVE_GRUPO', user);
  },
  RESET_GRUPO({commit}){
    commit('RECEIVE_GRUPO', {grupo: {permissoes: []}});
  }
},

getters =  {
    pageUsers: state => state.pageUsers,
    grupos: state => state.grupos,
    permissoes: state => state.permissoes,
    user: state => state.user,
    grupo: state => state.grupo
}

export default {
  state,
  mutations,
  actions,
  getters
}