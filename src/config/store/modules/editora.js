import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  editoras: []
}

const mutations = {
  RECEIVE_EDITORAS(state, {editoras}) {
    state.editoras = editoras
  }
}

const actions = {
  async GET_EDITORAS ({commit}, params) {
    const url = `${baseApiUrl}/editoras?nome=${params.nome}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_EDITORAS',{ editoras: data});
  }
},

getters =  {
    editoras: state => state.editoras
}

export default {
  state,
  mutations,
  actions,
  getters
}