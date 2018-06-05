const userIndex = () => import(/* webpackChunkName: user */ './Index')
const info = () => import(/* webpackChunkName: user */ './Info')

export default [
  {
    path: '/user',
    component: userIndex,
    meta: {
      breadName: '个人中心',
      title: '个人中心'
    },
    children: [
      {
        path: '',
        name: 'user.baseInfo',
        component: info,
        meta: {
          breadName: '个人中心',
          title: '个人中心'
        }
      }
    ]
  }
]
