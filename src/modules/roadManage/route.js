const passageIndex = () => import(/* webpackChunkName: road */ './Index.vue')
export default [
  {
    path: '/road/allot',
    name: '/road/allot',
    component: passageIndex,
    meta: {
      breadName: '段道管理',
      title: '段道管理-段道分配'
    }
  }
]
