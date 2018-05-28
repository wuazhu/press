// const userIndex = r => require.ensure([], () => r(require('./index.vue')), 'user')
// const userIndex2 = r => require.ensure([], () => r(require('./text.vue')), 'usser')
const userIndex = () => import(/* webpackChunkName: user */ './Index.vue')
const info = () => import(/* webpackChunkName: user */ './Info.vue')
export default [
  {
    path: '/user',
    component: userIndex,
    children: [
      {
        path: '',
        name: 'user.baseInfo',
        component: info
      }
    ]
  }
]
