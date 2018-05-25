import * as constants from './constant'
import services from '../../../conf/services'
import http from '../../../http'
const KEY_CP_CRM = 'cp-token'

// 获取用户身份
export function fetchAuth({ commit }) {
  let auth = localStorage.getItem(KEY_CP_CRM)
  auth = auth ? JSON.parse(auth) : null
  commit(constants.FETCH_AUTH, { auth, success: !!auth })
}

console.log(http)
// 执行登陆操作
export function doLogin({ commit }, data) {
  console.log('is action')
  return new Promise((resolve, reject) => {
    // 调用osp域的远程登录接口
    http.$http.post(services.login, data).then(ret => {
      console.log(ret)
      // let payload = ret.data
      // if (payload.success) {
      //   localStorage.setItem(KEY_CP_CRM, JSON.stringify(payload.auth))
      //   commit(constants.DO_LOGIN, payload)
      //   resolve()
      // } else {
      //   reject('登录失败！请输入正确的登录信息。')
      // }
    }).catch(err => {
      reject(`登录失败！${err}`)
    })
  })
}

// 注销
export function doLogout({ commit }) {
  // 调用osp域的远程注销接口
  http.$osp.post(services.osp.LOGOUT).then(ret => {
    let payload = ret.data
    if (payload.success) {
      localStorage.removeItem(KEY_CP_CRM)
    }
    commit(constants.DO_LOGOUT, payload)
  })
}

// 异步调用osp域的消息列表获取接口
export function fetchMessageListTop({ commit }, data) {
  return new Promise((resolve, reject) => {
    http.$osp.get(services.osp.MSG_LIST_TOP, data).then(ret => {
      let payload = ret.data
      if (payload.status === 'ok') {
        commit(constants.FETCH_MSG_LIST_TOP, payload.data)
        resolve()
      } else {
        commit(constants.FETCH_MSG_LIST_TOP, [])
        reject('获取消息列表失败!')
      }
    })
  })
}

// 异步调用osp域的消息列表获取接口
export function fetchMessageList({ commit }, data) {
  return new Promise((resolve, reject) => {
    http.$osp.get(services.osp.MSG_LIST, data).then(ret => {
      let payload = ret.data
      if (payload.status === 'ok') {
        commit(constants.FETCH_MSG_LIST, payload.data)
        resolve()
      } else {
        commit(constants.FETCH_MSG_LIST, [])
        reject('获取消息列表失败!')
      }
    })
  })
}

// 异步调用osp域的应用类型获取接口
export function fetchAppTypes({ commit }, data) {
  return new Promise((resolve, reject) => {
    http.$osp.get(services.osp.APP_TYPES, data).then(ret => {
      let payload = ret.data
      if (payload.status === 'ok') {
        commit(constants.FETCH_APP_TYPES, payload.data)
        resolve()
      } else {
        commit(constants.FETCH_APP_TYPES, [])
        reject('获取应用类型失败!')
      }
    })
  })
}

// 异步调用osp域的应用类型获取接口
export function fetchAppList({ commit }, data) {
  return new Promise((resolve, reject) => {
    http.$osp.get(services.osp.APP_LIST, data).then(ret => {
      let payload = ret.data
      if (payload.status === 'ok') {
        commit(constants.FETCH_APP_LIST, payload.data)
        resolve()
      } else {
        commit(constants.FETCH_APP_LIST, [])
        reject('获取应用信息列表失败!')
      }
    })
  })
}

// 异步调用osp域的应用类型获取接口
export function fetchAppListWithFilter({ commit }, data) {
  return new Promise((resolve, reject) => {
    http.$osp.get(services.osp.APP_LIST_WITH_FILTER, data).then(ret => {
      let payload = ret.data
      if (payload.status === 'ok') {
        commit(constants.FETCH_APP_LIST_WITH_FILTER, payload.data)
        resolve()
      } else {
        commit(constants.FETCH_APP_LIST_WITH_FILTER, [])
        reject('获取应用信息过滤列表失败!')
      }
    })
  })
}
