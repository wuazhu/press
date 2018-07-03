import user from 'modules/user/route'
import roadManage from 'modules/roadManage/route'
import accountManage from 'modules/accountManage/route'
import product from 'modules/products/route'
import ClientManage from 'modules/ClientManage/route'
import sysManage from 'modules/systemManage/route'
import devicesManage from 'modules/devices/route'
import notFound from 'modules/components/404Error'
export default [
  {
    name: 'login',
    path: '/',
    component: require('./modules/login/Index'),
    meta: {
      breadName: '登录',
      title: '报刊后台管理系统-登录'
    }
  },
  {
    path: '/bk',
    component: require('./modules/welcome'),
    meta: {
      breadName: '首页',
      title: '报刊后台管理系统首页'
    },
    children: [
      {
        name: 'dashboard',
        path: '',
        component: require('./modules/index/Index')
      },
      ...user,
      ...roadManage,
      ...accountManage,
      ...product,
      ...ClientManage,
      ...sysManage,
      ...devicesManage,
      {
        path: '404',
        component: notFound,
        meta: {
          breadName: '404',
          title: '页面找不到了~'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/bk/404'
  }
]
