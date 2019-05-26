import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageLivros: {rows: []}
}

const mutations = {
  RECEIVE_LIVROS(state, {pageLivros}) {
    state.pageLivros = pageLivros
  }
}

const actions = {
  async GET_LIVROS ({commit}, params) {
    const url = `${baseApiUrl}/livros?pagina=${params.page}&${params.name}=${params.value}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_LIVROS',{ pageLivros: data});
  }
},

getters =  {
    pageLivros: state => state.pageLivros
}

export default {
  state,
  mutations,
  actions,
  getters
}