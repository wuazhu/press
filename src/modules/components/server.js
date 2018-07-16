import { map } from 'lodash'
import http from '../../http'
import services from '../../conf/services'

// 获取组织机构树
export async function getOrgList(params) {
  let orgList = await http.$http.get(services.orgList, {
    params
  })
  return orgList.data
}

// 获取精品产品列表
export async function getProductsForBoutique(params) {
  let productList = await http.$http.get(services.boutique.getProductsForBoutique, {
    params
  })
  if (productList.data.status === 200 && productList.data.data.length > 0) {
    map(productList.data.data, item => {
      item.children = []
    })
  }
  return productList.data
}
