import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('loading', Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
