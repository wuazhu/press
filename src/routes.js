import user from 'modules/user/route'
import roadManage from 'modules/roadManage/route'
import accountManage from 'modules/accountManage/route'
import productClassification from 'modules/productClassification/route'
import ClientManage from 'modules/ClientManage/route'
import notFound from 'modules/components/404Error'
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
      ...accountManage,
      ...productClassification,
      ...ClientManage,
      {
        path: '404',
        component: notFound
      }
    ]
  },
  {
    path: '*',
    redirect: '/bk/404'
  }
]
