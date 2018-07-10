import http from '../../http'
import services from '../../conf/services'

// 获取员工列表
export async function getOrgStaff(params) {
  let orgStaff = await http.$http.get(services.orgStaff, {
    params
  })
  return orgStaff.data
}

// 获取员工设备列表
export async function getDevices(params) {
  let devices = await http.$http.get(services.devices.getDevices, {
    params
  })
  return devices.data
}

// 删除员工设备
export async function delDevices(params) {
  let devices = await http.$http.post(services.devices.delDevice, params)
  return devices.data
}

// 新增员工设备
export async function addDevices(params) {
  let devices = await http.$http.post(services.devices.addDevice, params)
  return devices.data
}
