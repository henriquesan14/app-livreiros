import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store/store'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'

//libs
import 'font-awesome/css/font-awesome.css'
import './config/bootstrap'
import './config/msgs'
import './config/mq'
import './config/loader'

//directives
import './directives/role-directive';

//interceptors
import './interceptors/auth-interceptor';
import './interceptors/not-auth.interceptor';
import './interceptors/authorization-interceptor';

//filters
import './filters/filter-totitle'
import './filters/filter-money'

Vue.use(VueTheMask)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
