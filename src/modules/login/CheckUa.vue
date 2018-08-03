<template>
  <div class="checkua">
    <div class="uamask"></div>
    <div class="uanotice">
      <div class="ntbox">
        <ul class="d-flex blist">
          <li v-for="(b, index) in browsers" :key="index" class="col">
            <a :href="b.dlink" target="_blank">
              <img :src="b.icon" alt="">
              <p>{{ b.bname }}</p>
            </a>
          </li>
        </ul>
        <h3 class="text-center mt-4">
          您的浏览器版本过低, 请点击上面浏览器下载切换最新浏览器!
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      browsers: [
        {
          bname: '谷歌浏览器(推荐)',
          dlink: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=chrome%20%E4%B8%8B%E8%BD%BD&rsv_spt=3&oq=%25E8%25B0%25B7%25E6%25AD%258C%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8&rsv_pq=a496be440001d970&rsv_t=3cee4avIX9i8U7CGQxAUqpxaWPwfW9dWVACiSRd7Rl4IBCGUtT0vRy%2B2N2k&rqlang=cn&rsv_enter=1&inputT=3228&rsv_sug3=19&rsv_sug1=20&rsv_sug7=100&rsv_sug2=0&rsv_sug4=6058',
          icon: '/static/images/google.svg'
        },
        {
          bname: 'Safari浏览器',
          dlink: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=safari%E6%B5%8F%E8%A7%88%E5%99%A8&rsv_spt=3&oq=chrome%2520%25E4%25B8%258B%25E8%25BD%25BD&rsv_pq=ab6a51b80002222c&rsv_t=02d68yRCf668vXUKijjLGdevNyMlR1YnL7vCHzLSDSutB8ZtsobzhDpq2GU&rqlang=cn&rsv_enter=1&inputT=3228&rsv_sug3=34&rsv_sug1=35&rsv_sug7=100&bs=chrome%20%E4%B8%8B%E8%BD%BD',
          icon: '/static/images/sf.svg'
        },
        {
          bname: '火狐浏览器',
          dlink: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8B%E8%BD%BD&rsv_spt=3&oq=%25E7%2581%25AB%25E7%258B%2590&rsv_pq=89210af80001c96a&rsv_t=a4e2m9b2LwQ%2BLAv1boZT7d8ignJzKgt2Ce50qutvU5a%2FQfSH99m4ISNiFLw&rqlang=cn&rsv_enter=1&inputT=1793&rsv_sug3=55&rsv_sug1=55&rsv_sug7=100&sug=%25E7%2581%25AB%25E7%258B%2590%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8%25E4%25B8%258B%25E8%25BD%25BD&rsv_n=1&bs=%E7%81%AB%E7%8B%90',
          icon: '/static/images/ff.svg'
        },
        {
          bname: 'IE10+浏览器',
          dlink: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=edge%E6%B5%8F%E8%A7%88%E5%99%A8&rsv_spt=3&oq=%25E7%2581%25AB%25E7%258B%2590%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8%25E4%25B8%258B%25E8%25BD%25BD&rsv_pq=c4f8ff6c0001cece&rsv_t=23c4P%2FAf06e2%2FkNcJUNZDem4ZzgiSKxtktA%2Bg70TjUnfkvMbOe89RX4Kh%2BM&rqlang=cn&rsv_enter=1&inputT=3264&rsv_sug3=74&rsv_sug1=73&rsv_sug7=100&sug=edge%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8&rsv_n=1&bs=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8B%E8%BD%BD',
          icon: '/static/images/ie.svg'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.checkua,
.uanotice {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
}
.uamask {
  width: 100%;
  height: 100%;
  filter: blur(20px);
  background: rgba(255, 255, 255, .99);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.ntbox {
  width: 100%;
  height: 400px;
  margin-top: 200px;
}
.blist {
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}

</style>
