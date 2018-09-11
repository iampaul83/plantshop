import Vue from 'vue'
import Home from './views/Home.vue'
import Router from 'vue-router'
import Products from './components/Products.vue'
import Detail from './components/pages/Detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/products',
          name: 'products',
          component: Products
        },
        {
          path: '/products/:product_id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '*',
      directives: '/'
    }
  ]
})
