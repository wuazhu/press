import http from '../../http'
import services from '../../conf/services'

// 获取首页图表
export async function getDashboardBusiness(params) {
  let chartBusiness = await http.$http.get(services.dashboard.business, {
    params
  })
  return chartBusiness.data
}

export async function getDashboardCustomer(params) {
  let chartCustomer = await http.$http.get(services.dashboard.customers, {
    params
  })
  return chartCustomer.data
}
