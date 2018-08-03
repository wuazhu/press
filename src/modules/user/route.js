const userIndex = () => import(/* webpackChunkName: user */ './Index')
const ModifyPass = () => import(/* webpackChunkName: user */ './ModifyPassword')

export default [
  {
    path: '/user',
    name: 'user',
    component: userIndex
  },
  {
    path: '/modifyPassword',
    name: 'modifyPassword',
    component: ModifyPass
  }
]
