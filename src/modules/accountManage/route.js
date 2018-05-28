const accountIndex = () => import(/* webpackChunkName: account */ './Index')

export default [
  {
    path: '/accountManage',
    name: 'sys.account',
    component: accountIndex
  }
]
