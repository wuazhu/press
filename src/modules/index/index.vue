<template>
  <div class="page-index">
    <div class="row">
      <div class="col-4">
        <t-card>
          <div class="d-flex text-sm text-5 index-card-header justify-content-between">
            <span>流转额(元)</span>
          </div>
          <div class="index-card">
            <h2 class="money-data">¥ 126,560</h2>
            <div class="data-box">
              <t-chart ref="circulateRef" :options="lineChart" :auto-resize="true" chart-width="100%" chart-height="50px"></t-chart>
            </div>
          </div>
          <div slot="foot" class="card-foot">
            <span class="text-muted text-md">月均销售额</span> <span class="text-gray">￥12,423</span>
          </div>
        </t-card>
      </div>
      <div class="col-4">
        <t-card>
          <div class="d-flex text-sm text-muted index-card-header justify-content-between">
            <span>收入目标(元)</span>
          </div>
          <div class="index-card">
            <h2 class="money-data">¥ 126,560</h2>
            <div class="data-box income-percent">
              <t-progress :percent="25" status="active" hide-info></t-progress>
            </div>
          </div>
          <div slot="foot" class="card-foot">
            <span class="text-muted text-md">目标完成率</span> <span class="text-gray ml-4">90%</span>
          </div>
        </t-card>
      </div>
      <div class="col-4">
        <t-card>
          <div class="d-flex text-sm text-muted index-card-header justify-content-between">
            <span>订购量(份)</span>
          </div>
          <div class="index-card">
            <h2 class="money-data">¥ 126,560</h2>
            <div class="data-box" style="width:100%;">
              <t-chart ref="lineSimple" :options="pieChart" :auto-resize="true" chart-width="100%" chart-height="50px"></t-chart>
            </div>
          </div>
          <div slot="foot" class="card-foot">
            <span class="text-muted text-md">完成率</span> <span class="text-gray ml-2">90%</span>
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

export default {
  data() {
    return {
      lineChart: {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.8)',
          extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
          textStyle: {
            color: '#f9f9f9'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show: false,
          data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          smooth: true,
          data: [10, 13, 16, 20, 30, 30, 32, 16, 20, 30, 30, 32],
          type: 'line',
          areaStyle: {
            color: '#229541'
          }
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          left: 0,
          right: 0,
          bottom: 40
        }
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
  mounted() {
    this.makeCirculateChart()
  },
  methods: {
    makeCirculateChart() {
      console.log(this.$refs.circulateRef.chart.resize())
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
    &.income-percent {
      padding-top: 26px;
      height: 50px;
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
</style>
