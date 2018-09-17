import http from '../../http'
import services from '../../conf/services'

// 移出段道
export async function moveOutSeg(params) {
  let result = await http.$http.post(services.region.moveOutSeg, params)
  return result.data
}
// 移入段道
export async function moveInSeg(params) {
  let result = await http.$http.post(services.region.moveInSeg, params)
  return result.data
}
// 新增段道
export async function addMarketSeg(params) {
  let result = await http.$http.post(services.region.addMarketSeg, params)
  return result.data
}
// 营销段道列表
export async function marketSegList(params) {
  let result = await http.$http.get(services.region.marketSegList, {
    params
  })
  return result.data
}
// 待分配客户列表
export async function unDistriList(params) {
  let result = await http.$http.get(services.region.unDistriList, {
    params
  })
  return result.data
}
// 已分配客户列表
export async function distriList(params) {
  let result = await http.$http.get(services.region.distriList, {
    params
  })
  return result.data
}

// 获取段道列表
export async function getRoadList(params) {
  let listData = await http.$http.get(services.region.region, {
    params
  })
  return listData.data
}

// 查询段道负责人
export async function getPresiders(params) {
  let presiders = await http.$http.get(services.region.getPresiders + params.rdSgId, {
    params
  })
  return presiders.data
}

// 保存段道负责人
export async function savePresiders(params) {
  let savePresiders = await http.$http.post(services.region.savePresider, params)
  return savePresiders.data
}

// 查询段道内客户
export async function regCustList(params) {
  let custList = await http.$http.get(services.region.regCustList, {
    params
  })
  return custList.data
}

// 校验客户是否存在段道内
export async function checkRegion(params) {
  let checkInfo = await http.$http.get(services.region.checkRegion, {
    params
  })
  return checkInfo.data
}

// 提交客户到段道内
export async function confirmCustReg(params) {
  let confirmResult = await http.$http.post(services.region.confirmCustReg, params)
  return confirmResult.data
}
