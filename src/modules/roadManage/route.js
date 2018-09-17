const passageIndex = () => import(/* webpackChunkName: road */ './Index.vue')
const bigAllot = () => import(/* webpackChunkName: road */ './BigAllot.vue')
export default [
  {
    path: '/road/allot',
    name: '/road/allot',
    component: passageIndex,
    meta: {
      breadName: '段道管理',
      title: '段道管理-段道分配'
    }
  },
  {
    path: '/road/bigallot',
    name: '/road/bigallot',
    component: bigAllot,
    meta: {
      breadName: '大宗段道管理',
      title: '段道管理-大宗段道管理'
    }
  }
]
