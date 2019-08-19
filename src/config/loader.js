import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {
    color: '#0080FF',
    loader: 'bars',
    backgroundColor: '#fff',
    width: 60,
    height: 50

  },{
    // slots
  })