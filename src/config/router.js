import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
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
