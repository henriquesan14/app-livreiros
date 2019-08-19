import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  pageLivros: {rows: []},
  livro: {
    acabamentoLivro: null,
    condicaoLivro: null
  }
}

const mutations = {
  RECEIVE_LIVROS(state, {pageLivros}) {
    state.pageLivros = pageLivros
  },
  RECEIVE_LIVRO(state, {livro}){
    state.livro = livro
  }
}

const actions = {
  async GET_LIVROS ({commit}, params) {
    const url = `${baseApiUrl}/livros?pagina=${params.page}&${params.name}=${params.value}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_LIVROS',{ pageLivros: data});
  },
  SET_LIVRO({commit}, livro){
    commit('RECEIVE_LIVRO', livro);
  },
  RESET_LIVRO({commit}){
    commit('RECEIVE_LIVRO', {livro: {acabamentoLivro: null, condicaoLivro: null}});
  }
},

getters =  {
    pageLivros: state => state.pageLivros,
    livro: state => state.livro
}

export default {
  state,
  mutations,
  actions,
  getters
}