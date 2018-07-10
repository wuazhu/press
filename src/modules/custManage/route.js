const clientIndex = () => import(/* webpackChunkName: client */ './Index.vue')
export default [
  {
    path: '/cust/merge',
    component: clientIndex,
    meta: {
      breadName: '客户管理',
      title: '客户管理-客户合并'
    }
  }
]
