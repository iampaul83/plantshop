import Vue from 'vue'
import Router from 'vue-router'
import Products from './components/Products.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Products
    },
    {
      path: '*',
      directives: '/'
    }
  ]
})
