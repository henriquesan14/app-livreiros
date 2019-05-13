import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
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
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'usuarios',
          name: 'admin',
          component: AdminPages
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
