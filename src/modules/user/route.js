const userIndex = () => import(/* webpackChunkName: user */ './Index')

export default [
  {
    path: '/user',
    name: 'user',
    component: userIndex
  }
]
