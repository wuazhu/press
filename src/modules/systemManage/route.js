const ifrPage = () => import(/* webpackChunkName: ifr */ './Index.vue')
export default [
  {
    path: '/uspaManage/uspa/:pathName/:timeSrc',
    name: 'uspaManage',
    component: ifrPage,
    meta: {
      breadName: '实体管理',
      title: '实体管理'
    }
  }
]
