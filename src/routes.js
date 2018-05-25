export default [
  {
    name: 'login',
    path: '/',
    component: require('./modules/login/index.vue')
  },
  {
    path: '*',
    component: {
      template: '<div>not found</div>'
    }
  }
]
