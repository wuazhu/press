const ifrPage = () => import(/* webpackChunkName: ifr */ './Index.vue')
export default [
  {
    path: '/uspaManage/uspa/:pathName/:timeSrc',
    name: 'uspaManage',
    component: ifrPage,
    meta: {
      breadName: '系统管理',
      title: '系统管理'
    }
  }
]
