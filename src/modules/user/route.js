// const userIndex = r => require.ensure([], () => r(require('./index.vue')), 'user')
const userIndex = () => import(/* webpackChunkName: laji */ './index.vue')
export default [
  {
    path: '/userinfo',
    component: userIndex
  }
]