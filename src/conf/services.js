/**
 * @file 本文件为服务调用URL常量配置实现
 * @author PRD UX R&D Dept.
 * @example <caption>配置示例</caption>
 * // 配置登录和注销服务地址
 * export default {
 *   LOGIN: '/foo/login',
 *   LOGOUT: '/foo/logout'
 * }
 */

export default {
  logout: '/sso-web/CsfCrmServlet?servicecode=sec_IOrgmodelClientCSV_logout',
  login: '/sso-web/CsfCrmServlet?servicecode=uspa_IOrgmodelClientCSV_loginIn',
  dashboard: {
    business: '/subpress-web/api/v1/incomeAnalysis',
    customers: '/mock/api/v1/dashboard/customers'
  },
  region: {
    region: '/subpress-web/api/v1/region',
    savePresider: '/subpress-web/api/v1/savePresider',
    getPresiders: '/subpress-web/api/v1/presider/'
  },
  customers: {
    customers: '/subpress-web/api/v1/customers'
  },
  orgList: '/subpress-web/api/v1/organize',
  orgStaff: '/subpress-web/api/v1/accounts',
  devices: {
    getDevices: '/subpress-web/api/v1/getAuthorizeDevice',
    delDevice: '/subpress-web/api/v1/delAuthorizeDevice',
    addDevice: '/subpress-web/api/v1/addAuthorizeDevice'
  },
  staff: {
    getStaffExtends: '/subpress-web/api/v1/getStaffExtendInfo',
    modifyStaffExtends: '/subpress-web/api/v1/modifyStaffExtendInfo'
  },
  performance: {
    getPerformance: '/subpress-web/api/v1/getPerformanceInfo',
    setPerformance: '/subpress-web/api/v1/addPerformanceTargetForStaff'
  },
  // 精品推荐
  boutique: {
    getBoutiqueList: '/subpress-web/api/v1/getBoutiqueList',
    delBoutique: '/subpress-web/api/v1/cancelBoutique',
    getProductsForBoutique: '/subpress-web/api/v1/getProductsForBoutique',
    addBoutique: '/subpress-web/api/v1/addBoutique'
  }
}
