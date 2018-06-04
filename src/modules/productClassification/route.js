const productIndex = () => import(/* webpackChunkName: product */ './Index.vue')
export default [
  {
    path: '/bk/productClassification',
    component: productIndex
  }
]
