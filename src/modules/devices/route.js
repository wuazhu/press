const accountAuthorization = () => import(/* webpackChunkName: account */ './Index.vue')

export default [
  {
    path: '/devices/accountAuthor',
    name: 'devices.accountAuthor',
    component: accountAuthorization,
    meta: {
      breadName: '设备管理',
      title: '设备管理-设备授权'
    }
  }
]
