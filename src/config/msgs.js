import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'exportLivros',
    payload => !payload.msg ? 'Exportação de livros iniciada!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'livroAdicionado',
    payload => !payload.msg ? 'Livro adicionado!' : payload.msg,
    {type: 'info', icon: 'info-circle'}
)


Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops... Erro inesperado!' : payload.msg,
    { type: 'error', icon: 'times' }
)