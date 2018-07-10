const Index = () => import(/* webpackChunkName: account */ './Index.vue')

export default [
  {
    path: '/circulate/setCheckGoal',
    name: 'ciculate.setCheckGoal',
    component: Index,
    meta: {
      breadName: '考核目标管理',
      title: '考核目标管理-流转额设置'
    }
  }
]
