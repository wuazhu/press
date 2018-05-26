import user from './modules/user/route.js'
export default [
  {
    name: 'login',
    path: '/',
    component: require('./modules/login/index.vue')
  },
  {
    name: 'dashboard',
    path: '/bk',
    component: require('./modules/welcome.vue'),
    children: [
      {
        name: 'dashboard.index',
        path: '',
        component: require('./modules/index/index.vue')
      },
      ...user
    ]
  },
  {
    path: '*',
    component: {
      template: '<div>not found</div>'
    }
  }
]

