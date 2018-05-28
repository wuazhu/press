import user from './modules/user/route'
import roadManage from './modules/roadManage/route'
import accountManage from './modules/accountManage/route'
export default [
  {
    name: 'login',
    path: '/',
    component: require('./modules/login/Index')
  },
  {
    path: '/bk',
    component: require('./modules/welcome'),
    children: [
      {
        name: 'dashboard',
        path: '',
        component: require('./modules/index/Index')
      },
      ...user,
      ...roadManage,
      ...accountManage
    ]
  },
  {
    path: '*',
    component: {
      template: '<div>not found</div>'
    }
  }
]
