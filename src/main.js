import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import './config/bootstrap'
import './config/msgs'
import store from './config/store'


Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjM1LCJub21lVXN1YXJpbyI6ImhlbnJpcXVlIiwicGVybWlzc29lcyI6WyJHRVJFTkNJQVJfVVNVQVJJT1MiLCJHRVJFTkNJQVJfR1JVUE9TIiwiR0VSRU5DSUFSX1BFUk1JU1NPRVMiXSwiaWF0IjoxNTU3NjkyNzAxLCJleHAiOjE2NDQwOTI3MDF9.rNdp1GUnFaNwL3y_HJ1S2YOs459ajkXAaS8CWps_75E'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
