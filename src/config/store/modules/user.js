import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageUsers: {rows: []},
  pageGrupos: {rows: []}
  
}

const mutations = {
  RECEIVE_USERS (state, {pageUsers}) {
    state.pageUsers = pageUsers
  },
  RECEIVE_GRUPOS(state, {pageGrupos}){
    state.pageGrupos = pageGrupos
  }
}

const actions = {
  async GET_USERS ({commit}, params) {
    const url = `${baseApiUrl}/usuarios?nome=${params.nome}&pagina=${params.page}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_USERS',{ pageUsers: data});
  },
  async GET_GRUPOS ({commit}, params) {
    const url = `${baseApiUrl}/grupos?nome=${params.nome}&pagina=${params.page}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_GRUPOS',{ pageGrupos: data});
  }
},

getters =  {
    pageUsers: state => state.pageUsers,
    pageGrupos: state => state.pageGrupos
}

export default {
  state,
  mutations,
  actions,
  getters
}