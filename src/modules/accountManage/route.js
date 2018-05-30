const accountIndex = () => import(/* webpackChunkName: account */ './Index')

export default [
  {
    path: '/account/manage',
    name: 'account.manage',
    component: accountIndex
  }
]
