import http from '../../http'
import services from '../../conf/services'

// 获取段道列表
export async function getRoadList(params) {
  let listData = await http.$bk.get(services.region.region, {
    params
  })
  return listData.data
}
