/**
 * @file 本文件实现路由控制逻辑
 * @author PRD UX R&D Dept.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { TGlobalLoading } from 'aid-taurus-desktop'
import routes from './routes'

// 注册路由插件
Vue.use(VueRouter)

TGlobalLoading.config({
  height: 3
})

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  TGlobalLoading.start()
  if (from.name === null) {
    // router.app.$store.dispatch('login/fetchAuth')
  }

  // if (!to.meta.noLogin && router.app.$store.state.login.success === false) {
  //   router.push({ path: '/login' })
  // }
  next()
})

router.afterEach(() => {
  TGlobalLoading.finish()
})

export default router
