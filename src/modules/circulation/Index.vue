<template>
  <div class="passage-index">
    <div class="index-title">
      <p class="text-base">考核目标管理</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <company-trees></company-trees>
        </div>
      </div>
      <div class="col-9">
        <div class="content-right">
          <div class="cust-list-item border">
            <div class="org-title">员工列表</div>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="total" :current="currentPage"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <!-- 设定考核目标 -->
    <t-modal v-model="targetIsShow" :closable="false" title="设定考核目标" style="width:455px;height:463px;">
      <t-form :model="targetItem">
        <t-form-item label="为 刘德华 设定 2018年度 流转额">
          <t-input v-model="targetItem.input" placeholder="请填写年度流转额"></t-input>
        </t-form-item>
        <div class="border-line"></div>
        <div class="plan-title d-flex justify-content-between">
          <span>2017年目标</span>
          <span>￥3000 / ￥4000</span>
        </div>
        <t-progress :percent="55" status="active"></t-progress>
        <div class="plan-title d-flex justify-content-between">
          <span>2016年目标</span>
          <span>￥3000 / ￥4000</span>
        </div>
        <t-progress :percent="75" status="active"></t-progress>
      </t-form>
    </t-modal>
  </div>
</template>

<script>
import companyTrees from '../components/CompanyTrees.vue'
import { getOrgStaff } from '../devices/server.js'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '员工',
          key: 'staffId'
        },
        {
          title: '姓名',
          key: 'staffName'
        },
        {
          title: '岗位',
          key: 'staffPosition'
        },
        {
          title: '考核目标',
          key: 'targetCount'
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
                    vm.targetIsShow = true
                  }
                }
              }, '设定考核目标')
            ])
          }
        }
      ],
      listData: [],
      targetIsShow: false,
      inforData: {},
      targetItem: {},
      equipmenttItem: {},
      currentPage: 1,
      total: 0,
      orgId: this.$store.state.login.orgId
    }
  },
  created() {
    this.getOrgStaffs()
  },
  methods: {
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
</style>
