import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageUsers: {rows: []},
  grupos: {rows: []} 
}

const mutations = {
  RECEIVE_USERS (state, {pageUsers}) {
    state.pageUsers = pageUsers
  },
  RECEIVE_GRUPOS(state, {grupos}){
    state.grupos = grupos
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
  }
},

getters =  {
    pageUsers: state => state.pageUsers,
    grupos: state => state.grupos
}

export default {
  state,
  mutations,
  actions,
  getters
}