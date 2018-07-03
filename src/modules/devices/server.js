import http from '../../http'
import services from '../../conf/services'

export async function getOrgStaff(params) {
  let orgStaff = await http.$http.get(services.orgStaff, {
    params
  })
  return orgStaff.data
}
