<template>
  <div class="client-distinct">
    <div class="index-title">
      <p class="text-base">客户去重</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <company-trees></company-trees>
        </div>
      </div>
      <div class="col-9">
        <div class="cust-list">
          <div class="cust-list-item border">
            <p class="org-title">待筛客户组1</p>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="cust-list-item border">
            <p class="org-title">待筛客户组1</p>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="cust-list-item border">
            <p class="org-title">待筛客户组1</p>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="100" :current="1"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <t-slipbox :visible.sync="clientData.visible" :styles="clientData.styls" class="demo__slipbox--1">
      <template slot="header">
        <div class="slipbox-title d-flex justify-content-between align-items-center">
          <p class="text-base">
            <i class="aid aid-arrow-left slipbox__arrow slipbox__arrow--left" @click="$_closeClientBox"></i>
            合并客户信息</p>
          <t-button type="info" size="sm">确定合并</t-button>
        </div>
      </template>
      <merge-client></merge-client>
    </t-slipbox>
  </div>
</template>

<script>
import companyTrees from '../components/CompanyTrees'
import mergeClient from './components/MergeClient'
import { getCustomerList } from './server'

export default {
  components: {
    companyTrees,
    mergeClient
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '姓名',
          align: 'left',
          key: 'name'
        },
        {
          title: '联系电话',
          align: 'center',
          key: 'teleNumber'
        },
        {
          title: '客户地址',
          align: 'center',
          key: 'address'
        },
        {
          title: '所在段道',
          align: 'center',
          key: 'road'
        },
        {
          title: '段道责任人',
          align: 'center',
          key: 'responsible'
        },
        {
          title: '操作',
          width: 240,
          align: 'right',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'border-right': '1px solid #E9E9E9', 'padding-right': '6px'},
                on: {
                  click() {
                  }
                }
              }, '详情'),
              h('span', {
                style: {'color': '#108EEA', 'border-right': '1px solid #E9E9E9', 'padding': '0 6px'},
                on: {
                  click() {
                    vm.clientData.visible = true
                  }
                }
              }, '合并其他'),
              h('span', {
                style: {'color': '#108EEA', 'padding': '0 6px'},
                on: {
                  click() {
                  }
                }
              }, '移出清单')
            ])
          }
        }
      ],
      listData: [
        {
          name: '刘德华',
          teleNumber: '18219223456',
          address: '北京市海淀区中关村软件园二期西北旺东路1',
          road: '1区1段',
          responsible: '张卫健'
        },
        {
          name: '刘德华',
          teleNumber: '18219223456',
          address: '北京市海淀区中关村软件园二期西北旺东路1',
          road: '1区1段',
          responsible: '张卫健'
        },
        {
          name: '刘德华',
          teleNumber: '18219223456',
          address: '北京市海淀区中关村软件园二期西北旺东路1',
          road: '1区1段',
          responsible: '张卫健'
        }
      ],
      clientData: {
        visible: false,
        styls: {
          width: '520px'
        }
      }
    }
  },
  methods: {
    $_closeClientBox() {
      this.clientData.visible = false
    },
    getCustmerData() {
      
    }
  }
}
</script>

<style lang="less" scoped>
.client-distinct {
  .slipbox__wraper {
    .slipbox__content {
      .slipbox__header {
        padding: 0 22px;
        border-bottom: 1px solid rgba(151,151,151,0.1);
      }
    }
  }
  .cust-list-item {
    margin-bottom: 20px;
  }
  .table__header {
    table {
      th {
        background: #fff;
        height: 40px;
        font-size: 12px;
        color: #000;
      }
    }
  }
  .table-tbody {
    td {
      height: 40px;
      font-size: 12px;
      color: #000;
      span {
        cursor: pointer;
      }
    }
  }
}

.slipbox-title {
  height: 56px;
  p {
    margin-bottom: 0;
    line-height: 56px;
    i {
      font-size: 20px;
      margin-right: 12px;
      cursor: pointer;
    }
  }
  button {
    width: 84px;
    height: 28px;
    background: #009241;
    font-size: 12px;
    line-height: 28px;
    span {

    }
  }
}
</style>
