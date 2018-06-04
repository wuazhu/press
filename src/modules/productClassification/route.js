const productIndex = () => import(/* webpackChunkName: product */ './Index.vue')
const boutiqueRecommendManage = () => import(/* webpackChunkName: product */ './BoutiqueRecommendManage.vue')
export default [
  {
    path: '/bk/productClassification',
    component: productIndex
  },
  {
    path: '/bk/boutique',
    component: boutiqueRecommendManage
  }
]
