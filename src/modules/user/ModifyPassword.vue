<template>
  <div class="user-center h-100 ">
    <div class="d-flex ov-hide h-100 justify-center">
      <div class=" m-auto user-box" >
        <div class="info p-3 text-center">
          <div class="user-form">
            <t-form
              ref="formRef"
              :model="userInfo"
              :rules="passRules"
              :label-span="4"
              label-position="left">
              <t-form-item label="账号:">
                <t-input v-model="userInfo.code" disabled placeholder="用户名"></t-input>
              </t-form-item>
              <t-form-item label="旧密码:" prop="oldPassword">
                <t-input v-model="userInfo.oldPassword" type="password" placeholder="请输入旧密码..."></t-input>
              </t-form-item>
              <t-form-item label="新密码:" prop="newPassword">
                <t-input v-model="userInfo.newPassword" type="password" placeholder="请输入新密码..."></t-input>
              </t-form-item>
              <t-form-item label="确认密码:" prop="confirmPass">
                <t-input v-model="userInfo.confirmPass" type="password" placeholder="请确认密码..."></t-input>
              </t-form-item>
            </t-form>
            <t-button type="primary" block @click="changePass">确认修改</t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { changePassword } from './server.js'

export default {
  data() {
    const CHECKSAME = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else {
        if (value !== this.userInfo.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        }
        callback()
      }
    }
    return {
      userInfo: {
        code: this.$store.state.login.code,
        oldPassword: '',
        newPassword: '',
        confirmPass: ''
      },
      passRules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        confirmPass: [{ required: true, validator: CHECKSAME, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      code: state => state.login.code
    })
  },
  methods: {
    changePass() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          let result = await changePassword({
            code: this.userInfo.code,
            oldPassword: this.userInfo.oldPassword,
            newPassword: this.userInfo.newPassword
          })
          if (result.status === 200) {
            this.$Message.success('修改成功!')
            this.$refs.formRef.resetFields()
          } else {
            this.$Notice.danger({
              title: `code: ${result.status}`,
              desc: result.message
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
@import './user.less';
</style>
