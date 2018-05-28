const passageIndex = () => import(/* webpackChunkName: user */ './index.vue')
// const info = () => import(/* webpackChunkName: user */ './info.vue')
export default [
  {
    path: '/passageManage',
    component: passageIndex
  }
]
