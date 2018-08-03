<template>
  <div class="systeam-page">
    <!-- <t-loading fix>
      <t-icon type="loading" size="24" class="demo-loading-icon-load"></t-icon>
      <div>Loading</div>
    </t-loading> -->
    <iframe ref="ifrRef" :src="pageUrl" class="ifrpage" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageUrl: ''
    }
  },
  watch: {
    $route(to) {
      // 加载路由路径参数信息
      this._fetchRoutePath()
    }
  },
  created() {
    this._fetchRoutePath()
  },
  mounted() {
  },
  methods: {
    _fetchRoutePath() {
      // 获取uspa路径
      // 获取路由参数信息
      let urlStrr = this.$route.path.split('/')
      let rode = urlStrr[urlStrr.length - 2]
      let timeSrc = urlStrr[urlStrr.length - 1]
      let pth = '/uspa-web/pc/iframe.html?DATE_TMP='
      this.pageUrl = `${pth + timeSrc}&menuName=${rode}`
    }
  }
}
</script>
<style>
.systeam-page {
  height: 100%;
  width: 100%;
  position: relative;
}
.demo-loading-icon-load{
  animation: ani-demo-loading 1s linear infinite;
}
@keyframes ani-demo-loading {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.ifrpage {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
