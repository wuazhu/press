import * as constants from './constant'

export default {
  [constants.DO_LOGIN](state, payload) {
    state.logined = payload.success
    if (state.logined) {
      state.auth = payload.auth
    }
  },
  [constants.DO_LOGOUT](state, payload) {
    state.logined = !payload.success
    if (!state.logined) {
      state.auth = null
    }
  },
  [constants.FETCH_AUTH](state, payload) {
    state.logined = payload.success
    state.auth = payload.auth
  }
}
