const accountIndex = () => import(/* webpackChunkName: user */ './index.vue')
// const info = () => import(/* webpackChunkName: user */ './info.vue')
export default [
  {
    path: '/accountManage',
    component: accountIndex
  }
]
