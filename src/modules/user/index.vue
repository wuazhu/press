<template>
  <div class="user-center mh-100 ">
    <div class="d-flex">
      <div class="col-3 h-100 user-left">
        <div class="userinfo row">
          <span class="col-3 text-center align-middle"><t-avatar></t-avatar></span>
          <div class="position col-9">
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
      <div class="col-9 mh-100 border-left">
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
  }
}
</style>
