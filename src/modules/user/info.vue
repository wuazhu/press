<template>
  <div class="info p-3">
    <div class="user-form">
      username: '',
        sex: 'male',
        email: '666@chinapost.com',
        birthday: '2011-01-01',
        county: '北京',
        province: '北京市',
        address: '右安门内大家66号',
        zipCode: '100000'
      <t-form :model="userInfo" label-position="right" :label-span="4">
        <t-form-item label="用户名" prop="username">
          <t-input v-model="userInfo.username" placeholder="用户名"></t-input>
        </t-form-item>
        <t-form-item label="性别" prop="sex">
          <t-switch v-model="userInfo.sex">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </t-switch>
        </t-form-item>
        <t-form-item label="邮箱" prop="email">
          <t-input v-model="userInfo.email" placeholder="email"></t-input>
        </t-form-item>
        <t-form-item label="出生日期" prop="birthday">
          <t-input v-model="userInfo.birthday" placeholder="表单尺寸普通 && 标题右对齐"></t-input>
        </t-form-item>
        <t-form-item label="多行">
          <div class="row">
            <div class="col-5">
              <t-select v-model="userInfo.input" placeholder="请输入"></t-select>
            </div>
            <div class="col-5">
              <t-input v-model="userInfo.input" placeholder="请输入"></t-input>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-7">
              <t-input v-model="userInfo.input" placeholder="请输入"></t-input>
            </div>
            <div class="col-4">
              <t-button><i class="aid aid-plus"></i></t-button>
            </div>
          </div>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        sex: 'male',
        email: '666@chinapost.com',
        birthday: '2011-01-01',
        county: '北京',
        province: '北京市',
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
  width: 400px;
  margin: 0 auto;
}
</style>
