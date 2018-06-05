const accountIndex = () => import(/* webpackChunkName: account */ './Index')

export default [
  {
    path: '/sys/manage',
    name: 'sys.manage',
    component: accountIndex,
    meta: {
      breadName: '绩效与授权',
      title: '系统管理-绩效与授权'
    }
  }
]
