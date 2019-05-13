import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import './config/bootstrap'
import './config/msgs'
import './config/mq'
import store from './config/store'


Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjM1LCJub21lVXN1YXJpbyI6ImhlbnJpcXVlIiwicGVybWlzc29lcyI6WyJHRVJFTkNJQVJfVVNVQVJJT1MiLCJHRVJFTkNJQVJfR1JVUE9TIiwiR0VSRU5DSUFSX1BFUk1JU1NPRVMiXSwiaWF0IjoxNTU3NzE4NTQ5LCJleHAiOjE2NDQxMTg1NDl9.-hMyh5lq7feYc5fM9tQY2SKYhgJAbYxnndtFN9_Qq6g'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
