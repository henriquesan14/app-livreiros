import { userKey, baseApiUrl, showError } from '@/global'
import axios from 'axios'


const state = {
  isMenuVisible: true,
  localUser: null || JSON.parse(localStorage.getItem(userKey))
}

const mutations = {
  setMenu(state, isVisible) {
    if (isVisible === undefined) {
      state.isMenuVisible = !state.isMenuVisible
    } else {
      state.isMenuVisible = isVisible
    }
  },
  setUser(state, res) {
    localStorage.setItem(userKey, res)
    state.localUser = JSON.parse(res)
  },
  removeUser() {
    localStorage.removeItem(userKey)
  }
}

const actions = {

  async LOGIN({ commit }, user) {
    const url = `${baseApiUrl}/login`;
    try{
      const { data } = await axios.post(url, user);
      commit('setUser', JSON.stringify(data.auth));
    }catch(err){
      showError(err);
    }
  },
  async LOGOUT({ commit }) {
    const url = `${baseApiUrl}/logout`;
    try{
      await axios.post(url);
      commit('removeUser');
    }catch(err){
      showError(err);
    }
  },
  toggleMenu({ commit }, isVisible) {
    commit('setMenu', isVisible)
  }
}

const getters = {
  isMenuVisible: state => state.isMenuVisible,
  localUser: state => state.localUser
}

export default {
  state,
  mutations,
  actions,
  getters
}

