import * as constants from './constant'
import services from '../../../conf/services'
import http from '../../../http'
const KEY_BK_TOKEN = 'bk-token'
let { $http } = http

// 获取用户身份
export function fetchAuth({ commit }) {
  let auth = localStorage.getItem(KEY_BK_TOKEN)
  auth = auth ? JSON.parse(auth) : null
  commit(constants.FETCH_AUTH, { auth, success: !!auth })
}

// 执行登陆操作
export async function doLogin({ commit }, data) {
  let res = await $http.post(services.login, data)
  if (res.data.status === 200) {
    localStorage.setItem(KEY_BK_TOKEN, JSON.stringify(res.data.data.token))
    commit(constants.DO_LOGIN, res.data)
  } else {
    localStorage.removeItem(KEY_BK_TOKEN)
    commit(constants.DO_LOGOUT)
  }
  return res.data
  // console.log('is action')
  // return new Promise(async (resolve, reject) => {
  //   // 调用osp域的远程登录接口
  //   try {
  //     let data = await  http.$http.post(services.login, data)
  //   } catch(err) {

  //   }
  //   http.$http.post(services.login, data).then(ret => {
  //     console.log(ret)
  //     // let payload = ret.data
  //     if (ret.) {
  //       localStorage.setItem(KEY_CP_CRM, JSON.stringify(payload.auth))
  //       commit(constants.DO_LOGIN, payload)
  //       resolve()
  //     } else {
  //       reject('登录失败！请输入正确的登录信息。')
  //     }
  //   }).catch(err => {
  //     reject(`登录失败！${err}`)
  //   })
  // })
}

// 注销
export function doLogout({ commit }) {
  // 调用osp域的远程注销接口
  http.$osp.post(services.osp.LOGOUT).then(ret => {
    let payload = ret.data
    if (payload.success) {
      localStorage.removeItem(KEY_BK_TOKEN)
    }
    commit(constants.DO_LOGOUT, payload)
  })
}
