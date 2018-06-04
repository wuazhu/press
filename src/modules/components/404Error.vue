<template>
  <div class="error404 text-center">
    <div class="error-wrap">
      <img src="/static/images/icon-empty.svg" alt="">
      <p class="text-muted text-lg"> 页面找不到了, 请换个页面试试~ </p>
      <div class="btn-group">
        <t-button type="primary" icon="keyboard-backspace">返回</t-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.error404 {
  width: 100%;
  height: 100%;
  .error-wrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 240px;
    }
    p {
      padding: 30px 0 10px;
    }
  }
}
</style>
