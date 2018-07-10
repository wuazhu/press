import http from '../../http'
import services from '../../conf/services'

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
