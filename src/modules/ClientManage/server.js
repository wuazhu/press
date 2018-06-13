import http from '../../http'
import services from '../../conf/services'

// 获取客户列表
export async function getCustomerList(payload) {
  let custData = await http.$http.get(services.customer.customer, {
    payload
  })
  return custData
}