import http from '../../http'
import services from '../../conf/services'

// 获取员工考核目标
export async function getPerformanceInfo(params) {
  let performanceInfo = await http.$http.get(services.performance.getPerformance, {
    params
  })
  return performanceInfo.data
}

// 获取员工考核目标
export async function setPerformanceInfo(params) {
  let performanceInfo = await http.$http.post(services.performance.setPerformance, params)
  return performanceInfo.data
}
