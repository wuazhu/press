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
  login: '/mock/api/v1/dologin',
  accounts: '/mock/api/v1/accounts',
  logins: '/sso-web/CsfCrmServlet?servicecode=uspa_IOrgmodelClientCSV_loginIn',
  dashboard: {
    business: '/mock/api/v1/dashboard/business',
    customers: '/mock/api/v1/dashboard/customers'
  },
  region: {
    region: '/subpress-web/api/v1/region',
    presider: '/subpress-web/api/v1/presider/',
    savePresider: '/subpress-web/api/v1/presider/save'
  },
  customers: {
    customers: '/subpress-web/api/v1/customers'
  }
}
