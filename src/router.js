import Vue from 'vue'

import Home from './views/Home.vue'
import Router from 'vue-router'
import Products from './components/Products.vue'
import Detail from './components/pages/Detail.vue'
import Login from './components/Login.vue'
import Discount from './components/pages/Discount.vue'
import Checkout from './components/pages/Checkout.vue'
import Payment from './components/pages/Payment.vue'

import Dashboard from './views/Dashboard.vue'
import AdminItems from './components/admin/Items.vue'
import AdminCoupon from './components/admin/Coupon.vue'
import AdminOrder from './components/admin/Order.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '',
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
          path: 'checkout',
          name: 'checkout',
          component: Checkout
        },
        {
          path: 'payment/:order_id',
          name: 'payment',
          component: Payment
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
      redirect: '/'
    }
  ]
})
