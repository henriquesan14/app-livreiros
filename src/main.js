import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate' 
import router from './config/router'
import './config/bootstrap'
import './config/msgs'
import './config/mq'
import './config/interceptors'
import store from './config/store/store'
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)
Vue.use(Vuelidate)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
