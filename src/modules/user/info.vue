<template>
  <div class="info p-3">
    <div class="user-form">
      <div class="avatar-info text-center row">
        <div class="avatar-wrap border">
          <t-upload action="//jsonplaceholder.typicode.com/posts/" style="width:110px;height:110px;">
            <img src="/static/images/avt.png" alt="">
            <div slot="tip" class="upload-text-bg text-lg">修改头像</div>
          </t-upload>
        </div>
      </div>
      <t-form :model="userInfo" label-position="right" :label-span="4">
        <t-form-item label="用户名" prop="username">
          <t-input v-model="userInfo.username" placeholder="用户名"></t-input>
        </t-form-item>
        <t-form-item label="性别" prop="sex">
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
          <t-date-picker v-model="userInfo.birthday"
            placeholder="请选择出生日期">
          </t-date-picker>
        </t-form-item>
        <t-form-item label="地址信息">
          <div class="row">
            <div class="col-6">
              <!-- <t-select v-model="userInfo.province" placeholder="请选择"></t-select> -->
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
        </t-form-item>
        <t-form-item label=" " class="mt-4">
          <t-button type="primary" block>保 存</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList: [
        {
          text: '北京市',
          id: 1001
        },
        {
          text: '福建省',
          id: 1002
        }
      ],
      userInfo: {
        username: '',
        sex: 'male',
        email: '666@chinapost.com',
        birthday: '2018-05-21',
        province: '北京市',
        city: '北京',
        address: '右安门内大家66号',
        zipCode: '100000'
      },
      userRule: {
        input: '',
        username: '',
        sex: 'male',
        email: '666@chinapost.com',
        birthday: '2011-01-01',
        county: '北京',
        province: '北京市',
        address: '右安门内大家66号',
        zipCode: '100000'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-form {
  width: 500px;
  margin: 0 auto;
  .form {
    position: relative;
    left: -10%;
  }
}
.avatar-info {
  padding: 50px 0;
  .avatar-wrap {
    width: 110px;
    height: 110px;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    margin: 0 auto;
    &:hover {
      .upload-text-bg {
        display: none;
      }
    }
  }
  .upload-select {
  }
  .upload-text-bg {
    transition: .3s;
    width: 110px;
    height: 110px;
    padding: 30px;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    line-height: 26px;
    color: #fff;
  }
  img {
    width: 110px;
  }
}
</style>
