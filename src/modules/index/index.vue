<template>
  <div class="page-index">
    <div v-if="ROLEIDENTY === 1" class="text-center">
      <img src="/static/images/home.png" alt="" class="home-img">
    </div>
    <div v-else>
      <div class="area bg-white border mb-2">
        统计范围:
        <t-dropdown
          :visible="visibleArea"
          trigger="custom"
          placement="bottom-start"
          style="margin-left: 20px">
          <t-button size="sm" @click="openOrgChange">
            {{ showOrgName }}
            <t-icon type="arrow-down-drop"></t-icon>
          </t-button>
          <t-dropdown-menu slot="list">
            <div class="area-box index-area">
              <organize-tree :need-filter="false" :border="false" @emitClickOrgTreeNode="changeOrg"></organize-tree>
            </div>
          </t-dropdown-menu>
        </t-dropdown>
      </div>
      <div class="row">
        <div class="col-4">
          <t-card>
            <div class="d-flex text-sm text-5 index-card-header justify-content-between">
              <span>流转额(元)</span>
            </div>
            <div class="index-card">
              <h2 class="money-data">¥ {{ salesVolumeFinish }}</h2>
              <div ref="cht" class="data-box cht">
                <t-chart ref="lineChartRef" :options="oneLineChart" chart-height="50" chart-width="350" auto-resize></t-chart>
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
              <h2 class="money-data">{{ orderFinish }}</h2>
              <div class="data-box cht">
                <t-chart ref="barChartRef" :options="barChart" chart-height="50" chart-width="350" auto-resize></t-chart>
              </div>
            </div>
            <div slot="foot" class="card-foot">
              <span class="text-muted text-md">月均量</span> <span class="text-gray ml-2">{{ orderMonthly }}</span>
            </div>
          </t-card>
        </div>
      </div>
      <!-- <div v-show="false" class="index-tabs border">
        <t-tabs>
          <t-tab-panel label="客户渠道" name="tab-new">
            <div class="row">
              <div class="col-8 chart-box">
                <div class="data-box">
                  <div id="newmember">
                    <t-chart
                      ref="addMemberRef"
                      :options="setChart"
                      :auto-resize="true"
                      chart-width="100%"
                      chart-height="300px"
                    ></t-chart>
                  </div>
                </div>
              </div>
              <div class="col-4 bg-chart-gray">
                <div class="addmember-circle d-flex">
                  <div class="common-chart-circle">
                    <div id="increaseChart"></div>
                  </div>
                  <div class="flex1 chart-infos">
                    <dl>
                      <dt class="add-title">{{ 14000 }}</dt>
                      <dd class="text-muted">
                        新增人数(人)
                      </dd>
                      <dt class="add-title">{{ 6000 }}</dt>
                      <dd class="text-muted">
                        新增收入(元)
                      </dd>
                      <dt class="add-title">{{ 5 }}% <span>1%</span></dt>
                      <dd class="text-muted">
                        新增率
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </t-tab-panel>
          <t-tab-panel label="客户渠道" name="tab-lost">
            <div class="row">
              <div class="col-8">
                <div class="data-box">
                </div>
              </div>
              <div class="col-4 bg-chart-gray">
                <p class="text-gray font-weight-bold">客户消费能力排行</p>
              </div>
            </div>
          </t-tab-panel>
        </t-tabs>
      </div> -->
    </div>
    
  </div>
</template>
<script>
import echarts from 'echarts'
import { forEach } from 'lodash'
import { getDashboardBusiness, getDashboardCustomer } from './server.js'
import organizeTree from '../components/OrganizeTree.vue'
import ckIdenMixin from '../utils/CheckIdenMixIn.js'

export default {
  mixins: [ckIdenMixin],
  components: {
    organizeTree
  },
  data() {
    return {
      oneLineChart: {},
      barChart: {},
      orgId: this.$store.state.login.orgId,
      showOrgName: this.$store.state.login.orgName,
      visibleArea: false,
      // 流转额
      salesVolumeFinish: 0,
      salesVolumeMonthly: 0,
      salesVolumeAxis: [],
      salesVolumeData: [],
      // 目标
      salesVolumeGoal: 0,
      salesVolumeGoalFinishRate: 0,
      // 订购量
      orderFinish: 0,
      orderMonthly: 0,
      orderData: [],
      orderAxis: [],
      // 新增客户
      addCustomerData: {
        increaseNumbers: 0,
        increaseSalesVolume: 0,
        increaseRate: 0,
        increaseRateDeviation: 0,
        increaseMonthData: {
          dataAxis: [],
          data: []
        },
        increaseRatioData: [],
        increaseRatioLabel: []
      },
      setChart: {
        title: {
          text: '新增客户趋势',
          left: 30,
          top: 0
        },
        color: ['#229541'],
        tooltip: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: {
            show: false
          },
          axisLabel: {
            rotate: 0
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          data: [],
          type: 'bar',
          barMaxWidth: 30
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          left: 70,
          right: 40,
          bottom: 60
        }
      }
    }
  },
  mounted() {
    if (this.ROLEIDENTY !== 1) {
      this.getDashboardData()
      setTimeout(() => {
        this.$_resetEleWidth()
      }, 2010)
      // this.getDashboardCust()
      document.addEventListener('click', () => {
        this.visibleArea = false
      })
      window.addEventListener('resize', () => {
        this.$_resetEleWidth()
      })
    }
  },
  methods: {
    $_resetEleWidth() {
      this.$refs.barChartRef.resize()
      this.$refs.lineChartRef.resize()
    },
    changeOrg({ orgId, orgName }) {
      this.orgId = orgId
      this.showOrgName = orgName
      this.visibleArea = false
      this.getDashboardData()
    },
    openOrgChange() {
      this.visibleArea = !this.visibleArea
    },
    async getDashboardData() {
      // 获取首页数据
      let y = new Date().getFullYear()
      let payload = {
        year: y,
        orgId: this.orgId
      }
      let dashboardData = await getDashboardBusiness(payload)
      if (dashboardData.status === 200) {
        // 设置流转额
        this.salesVolumeFinish = dashboardData.data.salesVolumeFinish
        this.salesVolumeMonthly = dashboardData.data.salesVolumeMonthly
        this.salesVolumeAxis = dashboardData.data.salesVolumeData.dataAxis
        this.salesVolumeData = dashboardData.data.salesVolumeData.data
        // 设置收入目标
        this.salesVolumeGoal = dashboardData.data.salesVolumeGoal
        this.salesVolumeGoalFinishRate = dashboardData.data.salesVolumeGoalFinishRate
        // 订购量
        this.orderFinish = dashboardData.data.orderFinish
        this.orderMonthly = dashboardData.data.orderMonthly
        this.orderData = dashboardData.data.orderData.data
        this.orderAxis = dashboardData.data.orderData.dataAxis
        this.$_resetEleWidth()
        this.circulateChart()
        this.orderChart()
      } else {
        this.salesVolumeFinish = 0
        this.salesVolumeMonthly = 0
        this.salesVolumeAxis = []
        this.salesVolumeData = []
        // 设置收入目标
        this.salesVolumeGoal = 0
        this.salesVolumeGoalFinishRate = 0
        // 订购量
        this.orderFinish = 0
        this.orderMonthly = 0
        this.orderData = []
        this.orderAxis = []
        this.$_resetEleWidth()
        this.circulateChart()
        this.orderChart()
        this.$Message.danger(dashboardData.message)
      }
    },
    async getDashboardCust() {
      // 获取首页客户数据
      let payload = {
        year: '2018',
        area: '1000'
      }
      let custData = await getDashboardCustomer(payload)
      if (custData.status === 200) {
        this.setChart.xAxis.data = custData.data.increaseMonthData.dataAxis
        this.setChart.series[0].data = custData.data.increaseMonthData.data
        // 设置新增客户数据
        this.addCustomerData.increaseNumbers = custData.data.increaseNumbers
        this.addCustomerData.increaseSalesVolume = custData.data.increaseSalesVolume
        this.addCustomerData.increaseRate = custData.data.increaseRate
        this.addCustomerData.increaseRateDeviation = custData.data.increaseRateDeviation
        this.addCustomerData.increaseMonthData = custData.data.increaseMonthData
        this.addCustomerData.increaseRatioData = custData.data.increaseRatioData
        forEach(custData.data.increaseRatioData, item => {
          this.addCustomerData.increaseRatioLabel.push(item.name)
        })
        this.createNewMemberCharts()
        setTimeout(() => {
          this.$refs.addMemberRef.resize()
        }, 10)
      } else {
        this.$Message.danger(custData.message)
      }
    },
    createNewMemberCharts() {
      let increaseChart = echarts.init(document.getElementById('increaseChart'))
      let increaseChartOpt = {
        title: {
          text: '新增情况统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          data: this.addCustomerData.increaseRatioLabel
        },
        series: [
          {
            name: '新增情况',
            type: 'pie',
            radius: ['50%', '70%'],
            color: ['#67A361', '#D6D6D6', '#F7DD6F'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.addCustomerData.increaseRatioData
          }
        ],
        grid: {
          top: 'top',
          bottom: -20
        }
      }
      increaseChart.setOption(increaseChartOpt)
      setTimeout(() => {
        increaseChart.resize()
      }, 10)
    },
    circulateChart() {
      let options = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}月份: <br />流转额: {c}',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            snap: true,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                globalCoord: false // 缺省为 false
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show: false,
          data: this.salesVolumeAxis
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          smooth: true,
          data: this.salesVolumeData,
          type: 'line',
          areaStyle: {
            color: '#229541'
          }
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          y: 1,
          y2: 2,
          x: 1,
          x2: 1
        }
      }
      this.oneLineChart = options
    },
    orderChart() {
      let opts = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}月份: <br />订购量: {c}',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            snap: true,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                globalCoord: false // 缺省为 false
              }
            }
          }
        },
        color: ['#1C90D3'],
        xAxis: {
          show: false,
          type: 'category',
          data: this.orderAxis,
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
          data: this.orderData,
          type: 'bar',
          barMaxWidth: '12'
        }],
        grid: {
          // 设置图表在容器中开始绘制的坐标
          y: 1,
          y2: 2,
          x: 1,
          x2: 1
        }
      }
      setTimeout(() => {
        this.barChart = opts
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
.cht {
  width: auto;
}
.cht > div,
.cht > div > div {
  height: 100%!important;
  width: 100%!important;
}
.text-5 {
  color: rgba(50,50,50,0.50);
}
.index-card {
  .data-box {
    height: 50px;
    width: auto;
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
#increaseChart {
  height: 300px;
}
.chart-box {
  // height: 300px;
  .data-box {
    padding: 10px 0;
  }
}
.addmember-circle {
  padding: 10px 0;
}
.common-chart-circle {
  width: 150px;
}
.bg-chart-gray {
  background: rgba(50,50,50,0.04);
}
.add-title {
  font-size: 24px;
  font-weight: 500;
  + dd {
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 200;
  }
}
.chart-infos {
  padding: 30px 20px 0 40px;
  justify-content: center;
  flex: 1;
  align-items: center;
}
.area {
  padding: 20px;
  .area-sel {
    border: 1px solid #000000;
  }
}
.area-box {
  width: 300px;
  max-height: 200px;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow: auto;
}
.components-tree {
  overflow-y: hidden!important;
  max-height: none!important;
}
.home-img {
  max-width: 800px;
  width: 100%;
}
</style>
