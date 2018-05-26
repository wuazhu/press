<template>
  <div class="login-container">
    <transition :name="transName">
      <div v-show="showLoginbox" class="login" @keyup.enter="doLoginHdl">
        <div class="logos d-flex">
          <img src="/static/images/logo.png" alt="">
          <h1 class="col text-lg text-center align-middle">报刊<br>系统</h1>
        </div>
        <t-form
          ref="login"
          :rules="rules"
          :model="loginForm"
          :label-span="2"
          label-position="left"
          size="sm">
          <t-form-item label="用户名" prop="username">
            <t-input v-model.trim="loginForm.username" placeholder="管理员: admin, 游客: guest"></t-input>
          </t-form-item>
          <input v-if="false" type="text">
          <t-form-item label="密码" prop="password">
            <t-input v-model="loginForm.password" type="password" placeholder="密码: 11"></t-input>
          </t-form-item>
          <t-form-item class="verify-code" label="验证码" prop="verify">
            <div class="code-wrap">
              <t-input v-model="loginForm.verify" class="" placeholder="验证码itzx"></t-input>
              <span class="code col-3 border"><img src="/static/images/code.png" alt=""></span>
            </div>
          </t-form-item>
          <t-form-item label="记住我" prop="rember">
            <t-switch v-model="loginForm.rember">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </t-switch>
          </t-form-item>
          <t-button type="primary" block @click="doLoginHdl">登录</t-button>
        </t-form>
        <!-- <div class="logo"><img src="/static/images/china-post-logo.svg" alt=""></div> -->
      </div>
    </transition>
    <div id="canvas-bg"><canvas id="stage" width="100%" height="100%"></canvas></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const KEY_USER_NAME = 'cnpost-bk-user'

export default {
  data() {
    return {
      showLoginbox: false,
      transName: 'flipY-reverse-slow',
      loginForm: {
        username: 'admin',
        password: '11',
        verify: 'itzx',
        rember: true
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        verify: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.login.logined
    })
  },

  created() {
  },
  mounted() {
    this.showLoginbox = true
  },
  methods: {
    ...mapActions('login', {
      doLoginAcs: 'doLogin'
    }),
    doLoginHdl() {
      this.$refs.login.validate(passed => {
        if (passed) {
          this.doLoginAcs(this.loginForm).then((res) => {
            if (res.status === 200) {
              if (this.loginForm.rememberMe === true) {
                localStorage.setItem(KEY_USER_NAME, this.loginForm.username)
              } else {
                localStorage.removeItem(KEY_USER_NAME)
              }
              this.$router.push({ name: 'dashboard' })
            } else {
              this.$Message.danger(res.msg)
            }
          }).catch(err => {
            this.$Message.danger(err)
          })
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
      position: absolute;
      padding-left: 0;
      padding-right: 0;
      height: 32px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}

</style>
