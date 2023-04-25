import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base:"/codehunter",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach( function (to,from,next) {
  next()
})

export default router