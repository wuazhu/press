import * as constants from './constant'
import services from '../../../conf/services'
import http from '../../../http'
const KEY_BK_TOKEN = 'bk-token'
const cnpSign = 'CNPSIGN'
let { $http } = http

// 获取用户身份
export function fetchAuth({ commit }) {
  let auth = localStorage.getItem(KEY_BK_TOKEN)
  auth = auth ? JSON.parse(auth) : null
  commit(constants.FETCH_AUTH, { auth, success: !!auth })
}

// 执行登陆操作
export async function doLogin({ commit }, data) {
  let param = {
    userCode: data.userCode,
    passWord: data.passWord
  }
  let res = await $http.post(services.login, {params: JSON.stringify(param)})
  if (res.data && res.data.data) {
    if (res.data.data.responseCode === '0') {
      let signObj = {
        sign: res.data.data.GLOBAL_SIGN,
        sessionId: res.data.data.GLOBAL_SESSION_ID,
        id: res.data.data.ID,
        staffId: res.data.data.STAFF_ID
      }
      sessionStorage.setItem(cnpSign, JSON.stringify(signObj))
      commit(constants.DO_LOGIN, res.data.data)
    }
  } else {
    sessionStorage.removeItem(cnpSign)
    commit(constants.DO_LOGOUT)
  }
  return res.data
}

// 注销
export async function doLogout({ commit }, uuid) {
  let param = {
    userCode: uuid
  }
  let res = await $http.post(services.logout, {params: JSON.stringify(param)})
  commit(constants.DO_LOGOUT)
  if (res.data && res.data.data) {
    return res.data.data
  } else {
    return {
      responseCode: '1',
      responseMsg: '服务错误'
    }
  }
}
