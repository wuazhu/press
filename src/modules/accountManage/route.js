const accountIndex = () => import(/* webpackChunkName: account */ './Index')

export default [
  {
    path: '/bk/accountManage',
    name: 'sys.account',
    component: accountIndex
  }
]
