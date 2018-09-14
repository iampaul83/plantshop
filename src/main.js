import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import VeeValidate from 'vee-validate'
import zhTWvalidate from 'vee-validate/dist/locale/zh_TW'

import Currency from './filters/currency'
import './bus'

Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('loading', Loading)
Vue.filter('currency', Currency)

axios.defaults.withCredentials = true
VeeValidate.Validator.localize('z-TW', zhTWvalidate)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((res) => {
      if (res.data.success) {
        console.log('path01', res.data)
        next()
      } else {
        console.log('path02', res.data)
        next({
          path: '/login'
        })
      }
    })
  } else {
    console.log('path03')
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
