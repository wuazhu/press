const clientIndex = () => import(/* webpackChunkName: client */ './Index.vue')
const clientDistinct = () => import(/* webpackChunkName: client */ './ClientDistinct.vue')
export default [
  {
    path: '/bk/clientIndex',
    component: clientIndex
  },
  {
    path: '/bk/clientDistinct',
    component: clientDistinct
  }
]
