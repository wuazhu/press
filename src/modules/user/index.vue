<template>
  <div class="user-center h-100 ">
    <div class="d-flex">
      <div class="col-3 user-left">
        <div class="userinfo row">
          <span class="col-3 text-center align-middle"><t-avatar bg-state="warning" text="WU"></t-avatar></span>
          <div class=" col-9">
            <h2 class="text-lg">超级管理员</h2>
            <span class="text-muted text-md">10ADMIN</span>
          </div>
        </div>
        <t-menu type="light" open-position="right" class="full-height">
          <t-menu-item name="1-2">文章管理</t-menu-item>
          <t-menu-item name="1-3">文章管理</t-menu-item>
          <t-menu-item name="1-3">文章管理</t-menu-item>
        </t-menu>
      </div>
      <div class="border-left full-right col-9" style="width: 80%">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

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
.full-right {
  padding-bottom: 1000px;
  margin-bottom: -1000px;
}
</style>
