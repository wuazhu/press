import * as constants from './constant'

export default {
  [constants.DO_LOGIN](state, payload) {
    /* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
    state.logined = true                              // 登录成功与否
    state.username = payload.NAME                     // 登录用户名
    state.id = payload.ID                             // 用户 id
    state.orgId = payload.ORG_ID                      // 组织机构 id
    state.orgName = payload.ORG_NAME                  // 组织机构名称
    state.staffId = payload.STAFF_ID                  // staffId
    state.token = payload.GLOBAL_SIGN                 // 签名
    state.uuid = payload.UUID                         // 退出登录需要
    state.distId = payload.DISTRICT_ID                // 区域 id
  },
  [constants.DO_LOGOUT](state) {
    state.logined = false
    state.username = null
    state.id = null
    state.orgId = null
    state.orgName = null
    state.staffId = null
    state.token = null
    state.uuid = null
    state.distId = null
  },
  [constants.FETCH_AUTH](state, payload) {
    state.logined = payload.success
    state.token = payload.token
  }
}
