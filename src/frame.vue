<template>
  <main>
    <check-ua v-if="showVersion"></check-ua>
    <transition v-else name="fade">
      <router-view></router-view>
    </transition>
    <t-back-top :bottom="80"></t-back-top>
  </main>
</template>
<script>
/**
 * @file 本文件为应用主体视图框架实现
 * @author PRD UX R&D Dept.
 */
import CheckUa from './modules/login/CheckUa'
export default {
  components: {
    CheckUa
  },
  data() {
    return {
      showVersion: false
    }
  },
  created() {
    if (this.$_chekIeVersion() < 10) {
      this.showVersion = true
    }
  },
  methods: {
    $_chekIeVersion() {
      let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      let isIE = (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) // 判断是否IE<11浏览器
      let isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
      let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
      if (isIE) {
        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        let fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion === 7) {
          return 7
        } else if (fIEVersion === 8) {
          return 8
        } else if (fIEVersion === 9) {
          return 9
        } else if (fIEVersion === 10) {
          return 10
        } else {
          return 6
        }
      } else if (isEdge) {
        return 12 // edge
      } else if (isIE11) {
        return 11 // IE11
      } else {
        return 13// 不是ie浏览器
      }
    }
  }
}
</script>
