<template>
  <div class="circulateChart">
    <div id="circulateChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    salesVolumeData: {
      type: Object,
      default: () => {
        return {
          dataAxis: [],
          data: []
        }
      }
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {
    let _Charts = echarts.init(document.getElementById('circulateChart'))
    let circulateChart = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'none', // 默认为直线，可选为：'line' | 'shadow'
          snap: true,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0, color: '#fff' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        show: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        smooth: true,
        data: [70, 90, 41, 80, 50, 30, 62],
        type: 'line',
        areaStyle: {
          color: '#6f43e2'
        }
      }],
      grid: {
        // 设置图表在容器中开始绘制的坐标
        left: 0,
        right: 0,
        bottom: 50
      }
    }
    _Charts.setOption(circulateChart)
    setTimeout(() => {
      _Charts.resize()
      console.log('is resized')
    }, 0)
  },
  updated() {
    console.log('updated')
  }
}
</script>

<style>
.circulateChart {
  width: 100%;
  height: 100%;
}
#circulateChart,
#circulateChart div {
  height: 50px;
}
</style>
