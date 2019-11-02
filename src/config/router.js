import Vue from 'vue'
import Router from 'vue-router'
import { userKey } from '@/global'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
      beforeEnter: function (to, from, next) {
        if (isLogged()) {
          next('/dashboard')
          return;
        }
        next()
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      beforeEnter: function (to, from, next) {
        if (isLogged()) {
          next()
          return;
        }
        next('/')
      },
      children: [
        {
          path: 'error403',
          name: 'error403',
          component: () => import('../views/Error403.vue')
        },
        {
          path: 'error404',
          name: 'error404',
          component: () => import('../views/Error404.vue')
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('../components/home/AnalyticsPedidos.vue')
        },
        {
          path: 'usuarios',
          name: 'admin',
          component: () => import('../components/admin/AdminPages.vue'),
        },
        {
          path: 'usuarios/cadastro',
          name: 'cadastro-user',
          component: () => import('../components/admin/CadastroUsuario.vue')
        },
        {
          path: 'usuarios/:id',
          name: 'edicao-user',
          component: () => import('../components/admin/EdicaoUsuario.vue')
        },
        {
          path: 'usuarios/grupos/cadastro',
          name: 'cadastro-grupo',
          component: () => import('../components/admin/CadastroGrupo.vue')
        },
        {
          path: 'usuarios/grupos/:id',
          name: 'edicao-grupo',
          component: () => import('../components/admin/EdicaoGrupo.vue')
        },
        {
          path: 'livros',
          name: 'livro',
          component: () => import('../components/livro/Livros.vue')
        },
        {
          path: 'livros/cadastro',
          name: 'cadastro-livro',
          component: () => import('../components/livro/CadastroLivro.vue')
        },
        {
          path: 'livros/edit/:id',
          name: 'edit-livro',
          component: () => import('../components/livro/EdicaoLivro.vue')
        },
        {
          path: 'livros/:id',
          name: 'livro-detalhes',
          component: () => import('../components/livro/LivroDetail.vue')
        },
        {
          path: 'livros/:idlivro/livrodescrito',
          name: 'cadastro-livro-descrito',
          component: () => import('../components/livro/CadastroLivroDescrito.vue')
        },
        {
          path: 'livros/:idlivro/livrodescrito/:idlivrodescrito',
          name: 'edicao-livro-descrito',
          component: () => import('../components/livro/EdicaoLivroDescrito.vue')
        },
        {
          path: 'assuntos',
          name: 'assunto',
          component: () => import('../components/livro/assunto/Assuntos.vue')
        },
        {
          path: 'editoras',
          name: 'editora',
          component: () => import('../components/livro/editora/Editoras.vue')
        },
        {
          path: 'autores',
          name: 'autor',
          component: () => import('../components/livro/autor/Autores.vue')
        },
        {
          path: 'categorias',
          name: 'categorias-descricao',
          component: () => import('../components/livro/categoria/Categorias.vue')
        },
        {
          path: 'categorias/:id',
          name: 'descricoes',
          component: () => import('../components/livro/categoria/Descricoes.vue')
        },
        {
          path: 'solicitacoes',
          name: 'solicitacoes',
          component: () => import('../components/solicitacoes/Solicitacoes.vue')
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: () => import('../components/cliente/Clientes.vue')
        },
        {
          path: 'clientes/:id',
          name: 'edicao-cliente',
          component: () => import('../components/cliente/EdicaoCliente.vue')
        },
        {
          path: 'clientes/cadastro',
          name: 'cadastro-cliente',
          component: () => import('../components/cliente/CadastroCliente.vue')
        },
        {
          path: 'pedidos',
          name: 'pedidos',
          component: () => import('../components/pedido/Pedidos.vue')
        },
        {
          path: 'pedidos/atual',
          name: 'pedido-atual',
          component: () => import('../components/pedido/PedidoAtual.vue')
        },
        {
          path: 'pedidos/export',
          name: 'export-pedido',
          component: () => import('../components/pedido/ImportPedido.vue')
        },
        {
          path: 'pedidos/:id',
          name: 'pedido-detail',
          component: () => import('../components/pedido/PedidoDetail.vue')
        },
        {
          path: '',
          redirect: '/dashboard/home'
        },
        {
          path: '*',
          redirect: '/dashboard/home'
        }
      ],

    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})


const isLogged = () => {
  let token = localStorage.getItem(userKey)
  if (token) {
    return true;
  }
  return false;
}
