import http from '../../http'
import services from '../../conf/services'

// 获取首页图表
export async function getBoutiqueList(params) {
  let boutiqueList = await http.$http.get(services.boutique.getBoutiqueList, {
    params
  })
  return boutiqueList.data
}

// 取消首页图表
export async function delBoutique(params) {
  let boutiqueList = await http.$http.post(services.boutique.delBoutique, params)
  return boutiqueList.data
}

// 新增
export async function addBoutique(params) {
  let addqueList = await http.$http.post(services.boutique.addBoutique, params)
  return addqueList.data
}
