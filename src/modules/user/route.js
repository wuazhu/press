// const userIndex = r => require.ensure([], () => r(require('./index.vue')), 'user')
// const userIndex2 = r => require.ensure([], () => r(require('./text.vue')), 'usser')
const userIndex = () => import(/* webpackChunkName: user */ './index.vue')
const info = () => import(/* webpackChunkName: user */ './info.vue')
export default [
  {
    path: '/user',
    component: userIndex,
    children: [
      {
        path: '',
        component: info
      }
    ]
  }
]
