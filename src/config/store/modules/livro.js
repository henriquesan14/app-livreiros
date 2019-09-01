import axios from 'axios';
import {baseApiUrl} from '@/global'

const state = {
  resultLivros: {body: {hits: {hits: []}}},
  livro: {
    acabamentoLivro: null,
    condicaoLivro: null
  },
  livroSelecionado: null
}

const mutations = {
  RECEIVE_LIVROS(state, {resultLivros}) {
    state.resultLivros = resultLivros
  },
  RECEIVE_LIVRO(state, {livro}){
    state.livro = livro
  },
  RECEIVE_LIVRO_SELECIONADO(state, {idLivro}){
    state.livroSelecionado = idLivro
  }
}

const actions = {
  async GET_LIVROS ({commit}, params) {
    const url = `${baseApiUrl}/livros?busca=${params.busca}&pagina=${params.pagina}`;
    const { data } = await axios.get(url);
    commit('RECEIVE_LIVROS',{ resultLivros: data});
  },
  SET_LIVRO({commit}, livro){
    commit('RECEIVE_LIVRO', livro);
  },
  RESET_LIVRO({commit}){
    commit('RECEIVE_LIVRO', {livro: {acabamentoLivro: null, condicaoLivro: null}});
  },
  SET_LIVRO_SELECIONADO({commit}, idLivro){
    commit('RECEIVE_LIVRO_SELECIONADO', idLivro);
  }
},

getters =  {
    resultLivros: state => state.resultLivros,
    livro: state => state.livro,
    livroSelecionado: state => state.livroSelecionado
}

export default {
  state,
  mutations,
  actions,
  getters
}