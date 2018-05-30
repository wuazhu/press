const productIndex = () => import(/* webpackChunkName: product */ './Index.vue')
const boutiqueRecommendManage = () => import(/* webpackChunkName: product */ './BoutiqueRecommendManage.vue')
const addPress = () => import(/* webpackChunkName: product */ './AddPress.vue')
export default [
  {
    path: '/bk/productClassification',
    component: productIndex
  },
  {
    path: '/bk/boutique',
    component: boutiqueRecommendManage
  },
  {
    path: '/bk/boutique/addPress',
    component: addPress
  }
]
