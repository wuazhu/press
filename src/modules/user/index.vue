<template>
  <div class="user-center">
    <div class="row">
      <div class="col-3">
        <div class="userinfo">
          <t-avatar></t-avatar>
        </div>
        <t-menu type="light" open-position="right">
          <t-menu-item name="1-2">文章管理</t-menu-item>
          <t-menu-item name="1-3">文章管理</t-menu-item>
          <t-menu-item name="1-3">文章管理</t-menu-item>
        </t-menu>
      </div>
      <div class="col-9">
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
