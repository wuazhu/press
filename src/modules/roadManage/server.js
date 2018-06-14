import http from '../../http'
import services from '../../conf/services'

// 获取段道列表
export async function getRoadList(params) {
  let listData = await http.$bk.get(services.region.region, {
    params
  })
  return listData.data
}

// 查询段道负责人
export async function queryRoadPresider(params) {
  let listData = await http.$bk.get(services.region.presider, {
    params
  })
  return listData.data
}