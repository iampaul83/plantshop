import Vue from 'vue'

import Home from './views/Home.vue'
import Router from 'vue-router'
import Products from './components/Products.vue'
import Detail from './components/pages/Detail.vue'
import Login from './components/Login.vue'
import Discount from './components/pages/Discount.vue'
import Cart from './components/pages/Cart.vue'

import Dashboard from './views/Dashboard.vue'
import AdminItems from './components/admin/Items.vue'
import AdminCoupon from './components/admin/Coupon.vue'
import AdminOrder from './components/admin/Order.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products
        },
        {
          path: 'products/:product_id',
          name: 'detail',
          component: Detail
        },
        {
          path: 'discount',
          name: 'discount',
          component: Discount
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      component: Dashboard,
      children: [
        {
          path: 'coupons',
          name: 'coupons',
          component: AdminCoupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'items',
          name: 'items',
          component: AdminItems,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'orders',
          component: AdminOrder,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '*',
      redirect: '/products'
    }
  ]
})
