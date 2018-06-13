<template>
  <div class="page-index">
    <div class="row">
      <div class="col-4">
        <t-card>
          <div class="d-flex text-sm text-5 index-card-header justify-content-between">
            <span>流转额(元)</span>
          </div>
          <div class="index-card">
            <h2 class="money-data">¥ {{ salesVolumeFinish }}</h2>
            <div class="data-box">
              <div id="circulateChart"></div>
            </div>
          </div>
          <div slot="foot" class="card-foot">
            <span class="text-muted text-md">月均销售额</span> <span class="text-gray">￥{{ salesVolumeMonthly }}</span>
          </div>
        </t-card>
      </div>
      <div class="col-4">
        <t-card>
          <div class="d-flex text-sm text-muted index-card-header justify-content-between">
            <span>收入目标(元)</span>
          </div>
          <div class="index-card">
            <h2 class="money-data">¥ {{ salesVolumeGoal }}</h2>
            <div class="data-box income-percent">
              <t-progress :percent="salesVolumeGoalFinishRate" status="active" hide-info></t-progress>
            </div>
          </div>
          <div slot="foot" class="card-foot">
            <span class="text-muted text-md">目标完成率</span> <span class="text-gray ml-4">{{ salesVolumeGoalFinishRate }}%</span>
          </div>
        </t-card>
      </div>
      <div class="col-4">
        <t-card>
          <div class="d-flex text-sm text-muted index-card-header justify-content-between">
            <span>订购量(份)</span>
          </div>
          <div class="index-card">
            <h2 class="money-data">¥ {{ orderFinish }}</h2>
            <div class="data-box" style="width:100%;">
              <div id="orderChart"></div>
            </div>
          </div>
          <div slot="foot" class="card-foot">
            <span class="text-muted text-md">完成率</span> <span class="text-gray ml-2">{{ orderFinishRate }}%</span>
          </div>
        </t-card>
      </div>
    </div>
    <div class="index-tabs">
      <t-tabs>
        <t-tab-panel label="客户渠道" name="tab-1">
          <div class="row">
            <div class="col-8">
              <div class="data-box">
                <t-chart ref="lineSimple" :options="pieChart" auto-resize chart-width="100%" chart-height="280px"></t-chart>
              </div>
            </div>
            <div class="col-4">
              <p class="text-gray font-weight-bold">客户消费能力排行</p>
            </div>
          </div>
        </t-tab-panel>
        <t-tab-panel label="客户渠道" name="tab-2">
          <div class="row">
            <div class="col-8">
              <div class="data-box">
                <t-chart ref="lineSimple" :options="pieChart" :auto-resize="true" chart-width="100%" chart-height="280px"></t-chart>
              </div>
            </div>
            <div class="col-4">
              <p class="text-gray font-weight-bold">客户消费能力排行</p>
            </div>
          </div>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getDashboardBusiness } from './server'

export default {
  components: {
  },
  data() {
    return {
      salesVolumeFinish: 0,
      salesVolumeMonthly: 0,
      salesVolumeData: {
        dataAxis: [],
        data: []
      },
      salesVolumeGoal: 0,
      salesVolumeGoalFinishRate: 0,
      orderFinish: 0,
      orderFinishRate: 0,
      orderData: {
        dataAxis: [],
        data: []
      },
      pieChart: {
        color: ['#1C90D3'],
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sunb', 'Sat1', 'Sun1', 'Sunb1'],
          axisLine: {
            lineStyle: {
              bgColor: '#1C90D3'
            }
          }
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 100, 70, 110, 130, 80, 110, 130, 80],
          type: 'bar',
          barMaxWidth: '12'
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          left: 0,
          right: 0,
          bottom: 80
        }
      }
    }
  },
  computed: {
    saledPercent() {
      return this.salesVolumeGoalFinishRate * 100
    }
  },
  created() {
  },
  mounted() {
    this.getDashboardData()
  },
  methods: {
    async getDashboardData() {
      let payload = {
        year: '2018',
        area: '1000'
      }
      let dashboardData = await getDashboardBusiness(payload)
      if (dashboardData.status === 200) {
        // 设置流转额
        this.salesVolumeFinish = dashboardData.data.salesVolumeFinish
        this.salesVolumeMonthly = dashboardData.data.salesVolumeMonthly
        this.salesVolumeData.dataAxis = dashboardData.data.salesVolumeData.dataAxis
        this.salesVolumeData.data = dashboardData.data.salesVolumeData.data
        // 设置收入目标
        this.salesVolumeGoal = dashboardData.data.salesVolumeGoal
        this.salesVolumeGoalFinishRate = dashboardData.data.salesVolumeGoalFinishRate
        this.orderFinish = dashboardData.data.orderFinish
        this.orderMonthly = dashboardData.data.orderFinishRate
        this.orderData = dashboardData.data.orderData
      } else {
        this.$Message.danger(dashboardData.message)
      }
      this.createCirculateChart()
      this.createOrderChart()
    },
    createAllCharts() {

    },
    createCirculateChart() {
      let _Charts = echarts.init(document.getElementById('circulateChart'))
      let circulateChartOpt = {
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
          data: this.salesVolumeData.dataAxis
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          smooth: true,
          data: this.salesVolumeData.data,
          type: 'line',
          areaStyle: {
            color: '#229541'
          }
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          left: 0,
          right: 0,
          bottom: 50
        }
      }
      _Charts.setOption(circulateChartOpt)
      setTimeout(() => {
        _Charts.resize()
      }, 10)
    },
    createOrderChart() {
      let _orderCharts = echarts.init(document.getElementById('orderChart'))
      let orderChartOpt = {
        color: ['#1C90D3'],
        xAxis: {
          show: false,
          type: 'category',
          data: this.orderData.dataAxis,
          axisLine: {
            lineStyle: {
              bgColor: '#1C90D3'
            }
          }
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: this.orderData.data,
          type: 'bar',
          barMaxWidth: '12'
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          left: 0,
          right: 0,
          bottom: 80
        }
      }
      _orderCharts.setOption(orderChartOpt)
      setTimeout(() => {
        _orderCharts.resize()
      }, 10)
    }
  }
}
</script>

<style lang="less" scoped>
.text-5 {
  color: rgba(50,50,50,0.50);
}
.index-card {
  .data-box {
    height: 50px;
    &.income-percent {
      padding-top: 26px;
    }
  }

}
.index-charts {
  padding-top: 20px;
  .card {
    border: none;
    border-radius: 0;
    .card-header {
      background: #fff;
    }
    .card-block {
      padding: 0 1.25rem;
    }
  }
}
.income-percent {
  .progress {
    background-color: rgba(50,50,50,0.08);
  }
  .bg-primary {
    background-color: rgba(255,217,51,1);
  }
}
.index-tabs {
  background: #fff;
  margin-top: 20px;
  .row {
    > div {
      padding-top: 20px;
    }
    ol {
      padding-right: 30px;
      padding-bottom: 20px;
      li {
        text-align: center;
        line-height: 20px;
        display: flex;
        flex: 1;
        margin-top: 18px;
        justify-content: space-between;
        .icon-circle {
          color: rgba(0,0,0,.65);
          display: inline-block;
          background: #f5f5f5;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 20px;
          font-style: normal;
        }
      }
    }
  }
  .nav-tabs {
    padding: 0 10px;
  }
}
#circulateChart,
#orderChart {
  height: 50px;
}
</style>
