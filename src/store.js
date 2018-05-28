/**
 * @file 本文件是根`store`对象实现文件
 * @author PRD UX R&D Dept.
 * @example <caption>引入foo模块的store对象</caption>
 * import foo from './modules/foo/store'
 * // ... ...
 * const modules = {
 *   foo
 * }
 * // ... ...
 * const store = new Vuex.Store({
 *  state: {},
 *  modules: {
 *    foo
 *  },
 * })
 */

import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

import login from './modules/login/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    login
  },
  plugins: [createPersistedState({
    filter: (action) => {
      console.log(!(action.type === 'login/DO_LOGIN'))
      return !(action.type === 'login/DO_LOGIN')
    }
  })]
})

export default store
