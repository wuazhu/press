<template>
  <div class="passage-index">
    <div class="index-title">
      <p class="text-base">考核目标管理</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <organize-tree @emitClickOrgTreeNode="changeOrg"></organize-tree>
        </div>
      </div>
      <div class="col-9">
        <div class="content-right">
          <div class="cust-list-item border">
            <div class="org-title">考核目标设置</div>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="total" :current="currentPage" :page-size="10" @on-change="changePage"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <!-- 设定考核目标 -->
    <t-modal
      v-model="targetIsShow"
      :closable="false"
      title="设定考核目标"
      style="width:455px;height:463px;"
      @on-ok="setPerformance">
      <t-form :model="targetItem">
        <t-form-item v-for="(item, index) in yearPrevAndNext" :key="index" :label="'设定 ' + item.year +' 年度流转额(元)'">
          <t-input v-model="item.targetCount" placeholder="请填写年度流转额"></t-input>
        </t-form-item>
        <div class="border-line"></div>
        <div v-for="it in inforData" :key="it.year" class="year-progress mb-2">
          <div class="plan-title d-flex justify-content-between">
            <span>{{ it.year }}年目标</span>
            <span>￥{{ it.finishCount }} / ￥{{ it.targetCount }}</span>
          </div>
          <t-progress :percent="(Number(it.finishCount) / Number(it.targetCount) * 100) || 0" status="normal" hide-info></t-progress>
        </div>
      </t-form>
    </t-modal>
  </div>
</template>

<script>
import { forEach, pick } from 'lodash'
import organizeTree from '../components/OrganizeTree.vue'
import { getOrgStaff } from '../devices/server.js'
import { getPerformanceInfo, setPerformanceInfo } from './server.js'

export default {
  components: {
    organizeTree
  },
  data() {
    return {
      yearPrevAndNext: [],
      listHeaderData: [
        {
          title: '员工编号',
          key: 'staffId'
        },
        {
          title: '员工名称',
          key: 'staffName'
        },
        {
          title: '岗位',
          key: 'staffPosition'
        },
        {
          title: '考核目标',
          key: 'targetCount',
          render: (h, params) => {
            return h('div', params.row.targetCount)
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'padding-right': '6px', 'cursor': 'pointer'},
                on: {
                  click() {
                    vm.staffId = params.row.staffId
                    vm.getPerformance()
                    vm.targetIsShow = true
                  }
                }
              }, '设定考核目标')
            ])
          }
        }
      ],
      listData: [],
      orgId: this.$store.state.login.orgId,
      targetIsShow: false,
      inforData: [],
      targetItem: {},
      currentPage: 1,
      staffId: null,
      total: 0
    }
  },
  created() {
    this.getOrgStaffs()
  },
  methods: {
    async setPerformance() {
      let params = {
        staffId: `${this.staffId}`,
        orgId: this.orgId,
        targetList: []
      }
      forEach(this.yearPrevAndNext, y => {
        let n = pick(y, ['year', 'targetCount'])
        n.targetCount = Number(n.targetCount)
        params.targetList.push(n)
      })
      let setResult = await setPerformanceInfo(params)
      if (setResult.status === 200) {
        this.$Message.success('设置成功!')
        this.getOrgStaffs()
      } else {
        this.$Message.danger(setResult.message)
      }
    },
    changeOrg({ orgId }) {
      this.orgId = orgId
      this.getOrgStaffs()
    },
    async getPerformance() {
      let years = []
      let nowYear = new Date().getFullYear()
      let nextYear = nowYear + 1
      let passYearLen = 3
      years.push(nextYear, nowYear)
      for (let i = 0; i < passYearLen; i++) {
        years.push(--nowYear)
      }
      let params = {
        staffId: this.staffId,
        orgId: this.orgId,
        yearList: years.join(',')
      }
      let performaces = await getPerformanceInfo(params)
      if (performaces.status === 200) {
        this.inforData = performaces.data
        this.yearPrevAndNext = performaces.data.slice(0, 2)
      } else {
        this.inforData = []
        if (performaces.status === 503) {
          this.$Message.warning('流转额列表为空!')
        } else {
          this.$Notice.danger({
            title: `code: ${performaces.status}`,
            desc: performaces.message
          })
        }
      }
    },
    changePage(pageNow) {
      this.currentPage = pageNow
      this.getOrgStaffs()
    },
    async getOrgStaffs() {
      let params = {
        pageSize: 10,
        currentPage: this.currentPage,
        orgId: this.orgId
      }
      let orgStaffs = await getOrgStaff(params)
      if (orgStaffs.status === 200) {
        this.total = orgStaffs.data.total
        this.listData = orgStaffs.data.data
      } else {
        this.total = 0
        this.listData = []
        if (orgStaffs.status === 503) {
          this.$Message.warning('员工列表数据为空!')
        } else {
          this.$Notice.danger({
            title: `code: ${orgStaffs.status}`,
            desc: orgStaffs.message
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

.passage-index {
  .index-title {
    p{
      line-height: 22px;
    }
  }
  .pagination__item--active {
    .pagination__item-link {
      background-color: #009241;
      border-color: #009241;
    }
  }
}
.transfer {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  .transfer-list {
    width: 180px;
    height: 185px;
    border: 1px solid #E9E9E9;
    span {
      color: #000;
    }
    .transfer-list__header {
      background: #fff;
      border-bottom: 1px solid #E9E9E9;
    }
  }
}
.demo-upload-list {
  .upload--drag {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
.form--label-left {
  .form-group {
    &:nth-child(1) {
      .form-group__label {
        line-height: 48px;
      }
    }
  }
}
.form-title {
  color: #009241;
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px solid #E9E9E9;
  margin-bottom: 16px;
}
.plan-title {
  line-height: 30px;
  font-size: 12px;
}
.border-line {
  width: 100%;
  height: 1px;
  background: #E9E9E9;
  margin-bottom: 20px;
}
.equipment-title {
  font-size: 12px;
  line-height: 18px;
  margin: 0 0 11px;
}
.equipmentList {
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  p {
    background: #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    line-height: 40px;
    padding-left: 16px;
    margin:0;
  }
  ul {
    list-style: none;
    padding:0;
    margin: 0;
    li{
      line-height: 32px;
      border-bottom: 1px solid #E9E9E9;
      padding:0 16px;
      span {
        &:nth-child(2) {
          color: #108EEA;
        }
      }
    }
  }
  .new-add {
    line-height: 32px;
    font-style: normal;
    color: #108EEA;
    font-size: 12px;
    padding-left: 16px;
  }
}
.cust-list-item {
    margin-bottom: 20px;
  }
.table-wrapper {
  .table--line {
    .table__header {
      thead {
        th {
          background: #fff;
          .text-truncate {
            color: #000;
          }
        }
      }
    }
  }
}
.year-progress .bg-primary {
  background-color: red!important;
}
</style>
