const accountIndex = () => import(/* webpackChunkName: account */ './Index')
const setCheckGoal = () => import(/* webpackChunkName: account */ './SetCheckGoal.vue')
const accountAuthorization = () => import(/* webpackChunkName: account */ './AccountAuthorization.vue')

export default [
  {
    path: '/sys/manage',
    name: 'sys.manage',
    component: accountIndex,
    meta: {
      breadName: '绩效与授权',
      title: '系统管理-绩效与授权'
    }
  },
  {
    path: '/sys/setCheckGoal',
    name: 'sys.setCheckGoal',
    component: setCheckGoal,
    meta: {
      breadName: '考核目标管理',
      title: '系统管理-考核目标管理'
    }
  },
  {
    path: '/sys/accountAuthor',
    name: 'sys.accountAuthor',
    component: accountAuthorization,
    meta: {
      breadName: '账户管理',
      title: '系统管理-账户管理'
    }
  }
]
