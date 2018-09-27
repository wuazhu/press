<template>
  <div class="login-container">
    <transition name="fade">
      <div v-show="showLoginbox" class="login" @keyup.enter="doLoginHdl">
        <div class="logos d-flex">
          <img src="/static/images/logo.png" alt="">
          <h1 class="col text-lg text-center align-middle">报刊<br>系统</h1>
        </div>
        <t-form
          ref="loginRef"
          :rules="rules"
          :model="loginForm"
          :label-span="2"
          label-position="left"
          size="sm">
          <t-form-item label="用户名" prop="userCode">
            <t-input v-model.trim="loginForm.userCode" placeholder="请输入用户名..."></t-input>
          </t-form-item>
          <input v-if="false" type="text">
          <t-form-item label="密码" prop="passWord">
            <t-input v-model="loginForm.passWord" type="password" placeholder="请输入密码..."></t-input>
          </t-form-item>
          <t-form-item class="verify-code" label="验证码" prop="verify">
            <div class="code-wrap">
              <t-input v-model="loginForm.verify" placeholder="请输入验证码..."></t-input>
              <span class="code col-3 border-left" @click="getVCode"><img :src="qrUrl" alt="" class="qrcode"></span>
            </div>
          </t-form-item>
          <!-- <t-form-item label="记住我" prop="rember">
            <t-switch v-model="loginForm.rember">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </t-switch>
          </t-form-item> -->
          <t-button type="primary" block class="mt-4" @click="doLoginHdl">登录</t-button>
        </t-form>
        <!-- <div class="logo"><img src="/static/images/china-post-logo.svg" alt=""></div> -->
      </div>
    </transition>
    <!-- <check-ua v-if="showVersion"></check-ua>  -->
  </div>
</template>

<script>
import { find } from 'lodash'
import { mapState, mapActions } from 'vuex'
import { base64ToStr } from '../utils/utils.js'

const KEY_USER_NAME = 'cnpost-bk-user'

export default {
  data() {
    return {
      showVersion: false,
      showLoginbox: false,
      qrUrl: '/static/images/code.png',
      qrCodeVal: '',
      loginForm: {
        userCode: '',
        passWord: '',
        verify: ''
        // userCode: '10admin',
        // passWord: 'Test@1234',
        // verify: 'itzx',
        // rember: true
      },
      rules: {
        userCode: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        passWord: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        verify: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },
      roleIdenty: null
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.login.logined
    })
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.clear()
    localStorage.clear()
    next()
  },
  created() {
    this.getVCode()
  },
  mounted() {
    this.showLoginbox = true
  },
  methods: {
    ...mapActions('login', {
      doLoginAcs: 'doLogin',
      getVerifiyCode: 'getVerifiyCode'
    }),
    async getVCode() {
      let vCode = await this.getVerifiyCode()
      if (vCode.status === 200) {
        this.qrUrl = vCode.data.url
        this.qrCodeVal = vCode.data.code
      }
    },
    $_chekIden(rol) {
      // 120000200 业务管理员
      // 120000400 收订
      // 120000600 系统管理员
      // 124000800 投递人员
      // 120001000 营销人员
      if (this.$_checkYwgl(rol) || this.$_checkXtgl(rol)) {
        return 1
      } else {
        return 2
      }
    },
    $_checkYwgl(rol) {
      // 校验业务管理人员
      if (find(rol, {roleId: 120000200})) {
        return true
      }
    },
    $_checkXtgl(rol) {
      // 校验系统管理人员
      if (find(rol, {roleId: 120000600})) {
        return true
      }
    },
    $_checkSdry(rol) {
      // 校验收递管理人员
      if (find(rol, {roleId: 120000400})) {
        return true
      }
    },
    $_checkStgl(rol) {
      // 校验收投管理人员
      if (find(rol, {roleId: 120000800})) {
        return true
      }
    },
    $_checkYxry(rol) {
      // 校验营销人员
      if (find(rol, {roleId: 120001000})) {
        return true
      }
    },
    doLoginHdl() {
      this.$refs.loginRef.validate(async passed => {
        if (passed) {
          let code = base64ToStr(this.qrCodeVal).toLowerCase()
          if (this.loginForm.verify.toLowerCase() !== code) {
            this.$Message.danger('验证码有误, 请重新输入')
            return
          }
          try {
            let response = await this.doLoginAcs(this.loginForm)
            if (response.data.responseCode === '0') {
              if (this.loginForm.rememberMe === true) {
                localStorage.setItem(KEY_USER_NAME, this.loginForm.userCode)
              } else {
                localStorage.removeItem(KEY_USER_NAME)
              }
              // 120000200 业务管理员
              // 120000400 收订
              // 120000600 系统管理员
              // 124000800 投递人员
              // 120001000 营销人员
              let rolesList = response.data.ROLES
              const roleType = this.$_chekIden(rolesList)
              if (roleType > 1) {
                this.$Message.warning('🚫非系统人员, 禁止登录!', 6)
                return
              }
              if (this.$route.query.redirect) {
                this.$router.push({ path: this.$route.query.redirect })
              } else {
                this.$router.push('/bk')
              }
            } else {
              this.$Message.danger(response.data.responseMsg)
            }
          } catch (err) {
            this.$Message.danger(err)
          }
        } else {
          this.showLoginbox = false
          setTimeout(() => {
            this.showLoginbox = true
          }, 110)
          this.$Message.danger('请输入正确的登录信息。')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("/static/images/logins.png") #f1f1f1 center 80% no-repeat;
  background-size: 100% auto;
  .logos {
    padding-bottom: 30px;
    img {
      width: 220px;
      height: 74px;
    }
    h1 {
      line-height: 36px;
      font-size: 26px;
    }
  }
  .login {
    width: 400px;
    margin: 0 auto;
    align-items:center;
    position: relative;
    z-index: 2;
    padding: 30px 30px 30px;
    background: #fff;
    box-shadow: 0 0 30px -2px rgba(0, 0, 0, .2);
  }
  .verify-code {
    .code-wrap {
      position: relative;
    }
    .code {
      top: 1px;
      right: 2px;
      bottom: 1px;
      position: absolute;
      padding-left: 0;
      padding-right: 0;
      height: 30px;
      overflow: hidden;
      .qrcode {
        width: 70px;
        height: 32px;
      }
    }
  }
}
</style>
