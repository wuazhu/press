const userIndex = () => import(/* webpackChunkName: user */ './Index')
const info = () => import(/* webpackChunkName: user */ './Info')

export default [
  {
    path: '/user',
    component: userIndex,
    children: [
      {
        path: '',
        name: 'user.baseInfo',
        component: info
      }
    ]
  }
]
