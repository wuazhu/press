import * as constants from './constant'

export default {
  [constants.DO_LOGIN](state, payload) {
    state.logined = true
    state.token = payload.data.token
  },
  [constants.DO_LOGOUT](state) {
    state.logined = false
    state.token = null
  },
  [constants.FETCH_AUTH](state, payload) {
    state.logined = payload.success
    state.token = payload.token
  }
}
