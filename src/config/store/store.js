import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth'
import user from './modules/user'
import estado from './modules/estado'
import livro from './modules/livro'
import autor from './modules/autor'
import editora from './modules/editora'
import assunto from './modules/assunto'
import categoria from './modules/categoria'
import axios from 'axios'
import router from '../router'
import {userKey} from '@/global'

Vue.use(Vuex);

axios.interceptors.request.use(function(config) {
    const auth = JSON.parse(localStorage.getItem(userKey));
    if(auth) {
        config.headers.Authorization = auth.token;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if (error.response.status === 401 && localStorage.getItem(userKey)) {
        localStorage.removeItem(userKey)
        router.push('/')
    }
    return Promise.reject(error);
});


export default new Vuex.Store({
    modules: {
        auth,
        user,
        estado,
        livro,
        editora,
        assunto,
        autor,
        categoria
    }
})