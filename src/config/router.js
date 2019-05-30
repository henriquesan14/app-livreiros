import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Home from '../components/home/Home.vue'
import Error403 from '../views/Error403.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import CadastroUsuario from'../components/admin/CadastroUsuario.vue'
import EdicaoUsuario from '../components/admin/EdicaoUsuario.vue'
import CadastroLivro from '../components/livro/CadastroLivro.vue'
import EdicaoLivro from '../components/livro/EdicaoLivro.vue'
import Livros from '../components/livro/Livros.vue'
import Assuntos from '../components/livro/assunto/Assuntos.vue'
import Editoras from '../components/livro/editora/Editoras.vue'
import Autores from '../components/livro/autor/Autores.vue'
import Categorias from '../components/livro/categoria/Categorias.vue'
import {userKey} from '@/global'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: function(to, from, next){
        if(isLogged()){
            next('/dashboard')
            return;
        }
        next()
    }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: function(to, from, next){
        if(isLogged()){
            next()
            return;
        }
        next('/')
      },
      children: [
        {
          path: 'error403',
          name: 'error403',
          component: Error403
        },
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'usuarios',
          name: 'admin',
          component: AdminPages,
        },
        {
          path: 'usuarios/cadastro',
          name: 'cadastro-user',
          component: CadastroUsuario
        },
        {
          path: 'usuarios/:id',
          name: 'edicao-user',
          component: EdicaoUsuario
        },
        {
          path: 'livros',
          name: 'livro',
          component: Livros
        },
        {
          path: 'livros/cadastro',
          name: 'cadastro-livro',
          component: CadastroLivro
        },
        {
          path: 'livros/edit/:id',
          name: 'edit-livro',
          component: EdicaoLivro
        },
        {
          path: 'assuntos',
          name: 'assunto',
          component: Assuntos
        },
        {
          path: 'editoras',
          name: 'editora',
          component: Editoras
        },
        {
          path: 'autores',
          name: 'autor',
          component: Autores
        },
        {
          path:'categorias',
          name: 'categorias-descricao',
          component: Categorias
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
   if(token){
      return true;
   }
   return false;
}
