import { userKey, baseApiUrl } from '@/global'
import axios from 'axios'


  const state =  {
    isMenuVisible: true,
    user: null || JSON.parse(localStorage.getItem(userKey))
  }

  const mutations =  {
    setMenu(state, isVisible){
      if(isVisible === undefined){
        state.isMenuVisible = !state.isMenuVisible
      }else{
        state.isMenuVisible = isVisible
      }
    },
    setUser(state, res){
      localStorage.setItem(userKey, res)
      state.user = res
    },
    removeUser(state){
        localStorage.removeItem(userKey)
        state.user = null
    }
  }

  const actions = {
    
    async LOGIN ({commit}, user) {
      console.log('login')
        const url = `${baseApiUrl}/login`;
        const { data } = await axios.post(url, user);
        commit('setUser', JSON.stringify(data.auth));
      },
      async LOGOUT ({commit}) {
        const url = `${baseApiUrl}/logout`;
        await axios.post(url);
        commit('removeUser');
      },
      toggleMenu({commit}, isVisible){
          commit('setMenu', isVisible)
      }
  }

  const getters = {
    isMenuVisible: state => state.isMenuVisible,
    user: state => state.user
  }

  export default {
    state,
    mutations,
    actions,
    getters
  }

