import user from './modules/user/route.js'
export default [
  {
    name: 'login',
    path: '/',
    component: require('./modules/login/Index.vue')
  },
  {
    path: '/bk',
    component: require('./modules/welcome.vue'),
    children: [
      {
        name: 'dashboard',
        path: '',
        component: require('./modules/index/Index.vue')
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

