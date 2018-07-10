import user from 'modules/user/route'
import roadManage from 'modules/roadManage/route'
import product from 'modules/products/route'
import custManage from 'modules/custManage/route'
import sysManage from 'modules/systemManage/route'
import devicesManage from 'modules/devices/route'
import ciculateManage from 'modules/circulation/route'
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
      ...product,
      ...custManage,
      ...sysManage,
      ...devicesManage,
      ...ciculateManage,
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
