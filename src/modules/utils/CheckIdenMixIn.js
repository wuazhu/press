import { mapState } from 'vuex'
import { find } from 'lodash'

const mixin = {
  data() {
    return {
      ROLEIDENTY: null
    }
  },
  computed: {
    ...mapState({
      ROLELIST: state => state.login.roles
    })
  },
  methods: {
    $_chekIden() {
      // 120000200 业务管理员
      // 120000400 收订
      // 120000600 系统管理员
      // 124000800 投递人员
      // 1 => 纯系统管理 只有系统管理菜单
      // 2 => 纯业务管理 没有系统管理菜单
      // 3 => 啥都有
      
      if (this.ROLELIST.length === 1) {
        if (this.$_checkXtgl()) {
          this.ROLEIDENTY = 1
        } else if (this.$_checkYwgl()) {
          this.ROLEIDENTY = 2
        }
      } else if (this.ROLELIST.length === 2) {
        if (this.$_checkXtgl() && (this.$_checkSdry() || this.$_checkStgl())) {
          // 系统管理员 + 投递 | 收投
          this.ROLEIDENTY = 1
        } else if (this.$_checkYwgl() && (this.$_checkSdry() || this.$_checkStgl())) {
          // 业务管理员 + 投递 | 收投
          this.ROLEIDENTY = 2
        } else if (this.$_checkXtgl() && this.$_checkYwgl()) {
          // 业务管理员 + 系统管理员
          this.ROLEIDENTY = 3
        }
      } else if (this.ROLELIST.length === 3) {
        if (this.$_checkYwgl() && this.$_checkSdry() & this.$_checkStgl()) {
          // 业务管理员 + 投递 + 收投
          this.ROLEIDENTY = 2
        } else if (this.$_checkXtgl() && this.$_checkSdry() & this.$_checkStgl()) {
          // 业务管理员 + 投递 + 收投
          this.ROLEIDENTY = 1
        } else if (this.$_checkXtgl() && this.$_checkYwgl() && (this.$_checkSdry() || this.$_checkStgl())) {
          // 业务管理员 + 系统管理员
          this.ROLEIDENTY = 3
        }
      } else {
        this.ROLEIDENTY = 3
      }
    },
    $_checkYwgl() {
      // 校验业务管理人员
      if (find(this.ROLELIST, { roleId: 120000200 })) {
        return true
      }
    },
    $_checkXtgl() {
      // 校验系统管理人员
      if (find(this.ROLELIST, { roleId: 120000600 })) {
        return true
      }
    },
    $_checkSdry() {
      // 校验收递管理人员
      if (find(this.ROLELIST, { roleId: 120000400 })) {
        return true
      }
    },
    $_checkStgl() {
      // 校验收投管理人员
      if (find(this.ROLELIST, { roleId: 120000800 })) {
        return true
      }
    }
  },
  created() {
    this.$_chekIden()
  }
}
export default mixin
