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
import livroDescrito from './modules/livro-descrito'
import cart from './modules/cart'
import pedido from './modules/pedido'
import endereco from './modules/endereco';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        estado,
        livro,
        editora,
        assunto,
        autor,
        categoria,
        livroDescrito,
        cart,
        pedido,
        endereco
    }
})