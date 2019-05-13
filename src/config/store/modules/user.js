import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageUsers: {rows: []}
}

const mutations = {
  RECEIVE_USERS (state, {pageUsers}) {
    state.pageUsers = pageUsers
  }
}

const actions = {
  async GET_USERS ({commit}, params) {
    const url = `${baseApiUrl}/usuarios?nome=${params.nome}&pagina=${params.page}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_USERS',{ pageUsers: data});
  }
},

getters =  {
    pageUsers: state => state.pageUsers
}

export default {
  state,
  mutations,
  actions,
  getters
}