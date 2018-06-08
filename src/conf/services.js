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
  login: '/api/v1/dologin',
  accounts: '/api/v1/accounts',
  logins: '/sso-web/UspaCsfCrmServlet?servicecode=uspa_IOrgmodelClientCSV_loginIn',
  dashboard: {
    business: '/api/v1/dashboard/business',
    customers: '/api/v1/dashboard/customers'
  },
  region: {
    region: '/api/v1/region',
    presider: '/presider/',
    savePresider: '/presider/save'
  }

}
