import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import './config/bootstrap'
import './config/msgs'
import './config/mq'
import store from './config/store/store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
