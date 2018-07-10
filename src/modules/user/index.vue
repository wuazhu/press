<template>
  <div class="user-center h-100 ">
    <div class="d-flex ov-hide h-100 justify-center">
      <div class=" m-auto user-box" >
        <div class="info p-3 text-center">
          <div class="user-form">
            <t-form
              :model="userInfo"
              :label-span="4"
              label-position="left">
              <t-form-item label="用户名:">
                <t-input v-model="userInfo.username" disabled placeholder="用户名"></t-input>
              </t-form-item>
              <t-form-item label="员工号:">
                <t-input v-model="userInfo.staffId" disabled placeholder="员工号"></t-input>
              </t-form-item>
              <t-form-item label="微信号:">
                <t-input v-model="userInfo.wx" placeholder="请输入微信号"></t-input>
              </t-form-item>
              <t-form-item label="手机号:">
                <t-input v-model="userInfo.phone" placeholder="请输入手机号"></t-input>
              </t-form-item>
              <t-form-item label="QQ号:">
                <t-input v-model="userInfo.qq" placeholder="请输入QQ号"></t-input>
              </t-form-item>
              <t-form-item label="" class="mt-4">
                <t-button type="primary" block @click="saveExt">保 存</t-button>
              </t-form-item>
            </t-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { forEach } from 'lodash'
import { getStaffExt, mdfStaffExt } from './server.js'

export default {
  data() {
    return {
      userInfo: {
        username: this.$store.state.login.username,
        staffId: this.$store.state.login.staffId,
        wx: '',
        phone: '',
        qq: '',
        wxid: null,
        phoneid: null,
        qqid: null
      }
    }
  },
  computed: {
    ...mapState({
      staffId: state => state.login.staffId
    })
  },
  async created() {
    this.getStaffInfo()
  },
  methods: {
    async getStaffInfo() {
      let result = await getStaffExt({
        staffId: this.staffId
      })
      if (result.status === 200) {
        forEach(result.data.extendInfos, ext => {
          if (ext.infoType === 'PHONE') {
            this.userInfo.phone = ext.infoContent
            this.userInfo.phoneid = ext.id
          }
          if (ext.infoType === 'WX') {
            this.userInfo.wx = ext.infoContent
            this.userInfo.wxid = ext.id
          }
          if (ext.infoType === 'QQ') {
            this.userInfo.qq = ext.infoContent
            this.userInfo.qqid = ext.id
          }
        })
      } else {
        this.$Notice.danger({
          title: `code: ${result.status}`,
          desc: result.message
        })
      }
    },
    async saveExt() {
      let params = {
        staffId: this.staffId,
        extendInfos: [
          {
            id: this.userInfo.wxid,
            infoContent: this.userInfo.wx,
            infoType: 'WX',
            infoTypeName: ' 微信号码'
          },
          {
            id: this.userInfo.qqid,
            infoContent: this.userInfo.qq,
            infoType: 'QQ',
            infoTypeName: 'QQ号码'
          },
          {
            id: this.userInfo.phoneid,
            infoContent: this.userInfo.phone,
            infoType: 'PHONE',
            infoTypeName: '手机号码'
          }
        ]
      }
      console.log(params)
      let saveResult = await mdfStaffExt(params)
      if (saveResult.status === 200) {
        this.$Message.success('修改成功!')
      } else {
        this.$Message.danger(saveResult.message)
      }
    }
  }
}
</script>

<style lang="less">
.user-left {
  padding-top: 30px;
  height: 100%;
  padding-bottom: 30px;
  .menu--vertical:after {
    display: none;
  }
  .menu--light.menu {
    background: transparent;
  }
  .userinfo {
    padding-top: 20px;
    padding-bottom: 20px;
    .avatar {
      width: 60px;
      height: 60px;
    }
    .avatar__text {
      font-size: 30px;
      line-height: 60px;
    }
  }
}
.line {
  height: 1px;
  width: 100%;
  background: #dee4e2;
  margin-bottom: 20px;
}
.user-box {
  width: 400px;
}
.justify-center {
  justify-content: center;
  align-items: center;
}
</style>
