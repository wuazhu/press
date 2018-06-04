const clientIndex = () => import(/* webpackChunkName: client */ './Index.vue')
export default [
  {
    path: '/bk/clientIndex',
    component: clientIndex
  }
]
