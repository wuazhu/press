import http from '../../http'
import services from '../../conf/services'

// 修改员工扩展信息
export async function mdfStaffExt(params) {
  let mdfResult = await http.$http.post(services.staff.modifyStaffExtends, params)
  return mdfResult
}

// 获取员工扩展信息
export async function getStaffExt(params) {
  let staffExt = await http.$http.get(services.staff.getStaffExtends, {
    params
  })
  return staffExt.data
}
