import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Currency from './filters/currency'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('loading', Loading)
Vue.filter('currency', Currency)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axois.post(api).then( (res) => {
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
