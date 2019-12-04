import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/shop/:shopId',
    name: 'shopInfo',
    component: () => import('../views/ShopInfo.vue')
  },
  {
    path: '/shop/:shopId/menu-register',
    name: 'menu-register',
    component: () => import('../views/MenuRegister.vue')
  },
  {
    path: '/shop/:shopId/menu/:menuItemId',
    name: 'menuInfo',
    component: () => import('../views/MenuItemDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
