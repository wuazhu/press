import http from '../../http'
import services from '../../conf/services'

export async function getOrgList(params) {
  let orgList = await http.$http.get(services.orgList, {
    params
  })
  return orgList.data
}