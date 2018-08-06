const productQuality = () => import(/* webpackChunkName: product */ './Index.vue')
const abc = () => import(/* webpackChunkName: product */ './test.vue')
export default [
  {
    path: '/product/quality',
    component: productQuality,
    meta: {
      breadName: '精品推荐管理',
      title: '产品分类-精品推荐管理'
    }
  },
  {
    path: '/abc',
    component: abc,
    meta: {
      breadName: '精品推荐管理',
      title: '产品分类-精品推荐管理'
    }
  }
]
