<template>
  <div class="user-center h-100 ">
    <div class="d-flex ov-hide h-100 justify-center">
      <div class=" m-auto user-box" >
        <div class="info p-3 text-center">
          <div class="user-form">
            <div class="avatar-info text-center row">
              <!-- <div class="avatar-wrap border">
                <t-upload action="//jsonplaceholder.typicode.com/posts/" style="width:110px;height:110px;">
                  <img src="/static/images/avt.png" alt="">
                  <div slot="tip" class="upload-text-bg text-lg">修改头像</div>
                </t-upload>
              </div> -->
            </div>
            <t-form
              :model="userInfo"
              :label-span="4"
              label-position="left">
              <t-form-item label="用户名:" prop="username">
                <t-input v-model="userInfo.username" disabled placeholder="用户名"></t-input>
              </t-form-item>
              <t-form-item label="员工号:" prop="staff">
                <t-input v-model="userInfo.staff" disabled placeholder="员工号"></t-input>
              </t-form-item>
              <t-form-item label="微信号:" prop="wechat">
                <t-input v-model="userInfo.wechat" placeholder="请输入微信号"></t-input>
              </t-form-item>
              <t-form-item label="手机号:" prop="phone">
                <t-input v-model="userInfo.phone" placeholder="请输入手机号"></t-input>
              </t-form-item>
              <!-- <t-form-item label="性别" prop="sex">
                <t-radio-group v-model="userInfo.sex">
                  <t-radio label="male">
                    <t-icon type="gender-male"></t-icon>
                    <span>男</span>
                  </t-radio>
                  <t-radio label="female">
                    <t-icon type="gender-female"></t-icon>
                    <span>女</span>
                  </t-radio>
                </t-radio-group>
              </t-form-item>
              <t-form-item label="邮箱" prop="email">
                <t-input v-model="userInfo.email" placeholder="email"></t-input>
              </t-form-item>
              <t-form-item label="出生日期" prop="birthday">
                <t-date-picker
                  v-model="userInfo.birthday"
                  placeholder="请选择出生日期">
                </t-date-picker>
              </t-form-item>
              <t-form-item label="地址信息">
                <div class="row">
                  <div class="col-6">
                    <t-select v-model="userInfo.province" placeholder="请选择">
                      <t-option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.text }}</t-option>
                    </t-select>
                  </div>
                  <div class="col-6 ">
                    <t-select v-model="userInfo.city" placeholder="请选择">
                      <t-option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.text }}</t-option>
                    </t-select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <t-input v-model="userInfo.address" placeholder="请输入详细地址"></t-input>
                  </div>
                </div>
              </t-form-item>
              <t-form-item label="邮政编码" prop="zipCode">
                <t-input v-model="userInfo.zipCode" placeholder="请输入邮政编码"></t-input>
              </t-form-item> -->
              <t-form-item label="" class="mt-4">
                <t-button type="primary" block>保 存</t-button>
              </t-form-item>
            </t-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        staff: 'male'
      },
      userRule: {
        username: '',
        staff: ''
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
